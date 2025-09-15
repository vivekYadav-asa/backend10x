const {Router}=require('express')
const userRouter=Router();
const { userMiddleware}=require('../middleware/user')
const {userModel, purchaseModel, courseModel}=require('../db')
const jwt=require('jsonwebtoken')
const bcrypt =require( 'bcrypt')
const z=require('zod')
const{ JWT_USER_PASSWORD}=require('../config')
userRouter.post('/signup', async function(req,res) {
    const {email,password,firstName,lastName}=req.body;
    //todo:adding zod for validtion
    //todo hash the password so plaintext pw is not stored in the db
    // todo :put inside a try catch block

  const reqBody = z.object({
        email: z.string().email().includes('@'),
        password: z.string().min(6).max(20),
        firstName: z.string().min(3).max(50),
        lastName: z.string().min(3).max(50)
    })

       const parseBodyWithSucess = reqBody.safeParse(req.body)
    if (!parseBodyWithSucess.success) {
        res.status(403).json({
            error: parseBodyWithSucess.error
        })
        return
    }

  const hashPassword = await bcrypt.hash(password, 5)
    try {
        await userModel.create({
            email: email,
            password: hashPassword,
            firstName: firstName,
            lastName: lastName
        })
    } catch (e) {
        console.log("Error: ", e);

    }
    res.json({
        msg: "User signed up"
    })
})
userRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    //since I have already hashed password, it cant ne verified using password anymore,
    // 1. Find user by email only
    const user = await userModel.findOne({
        email: email
    })

    if (!user) {
        return res.status(403).json({
            msg: "User not found"
        })
    }

    // 2. Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(403).json({
            msg: "Invalid password"
        })
    }

    //  3. sign for JWT token
    const token = jwt.sign({
        id: user._id
    }, JWT_USER_PASSWORD)

    res.json({
        token: token,
        msg: "signed in successfully"
    })
})


userRouter.get('/purchases ', userMiddleware ,async function(req,res){
    const userId=req.userId
    const purchases= await purchaseModel.find({
        userId
    })
    const courseData=await courseModel.find({
        _id:{$in:purchases.map(x=>x.courseId)}
    })
res.json({
purchases,
courseData
})
})

module.exports={
userRouter:userRouter
}