const {Router}=require('express')
const userRouter=Router();
const {userModel, purchaseModel, courseModel}=require('../db')
const jwt=require('jsonwebtoken')
const{ JWT_USER_PASSWORD}=require('../config')
userRouter.post('/signup', async function(req,res) {
    const {email,password,firstName,lastName}=req.body;
    //todo:adding zod for validtion
    //todo hash the password so plaintext pw is not stored in the db
    // todo :put inside a try catch block
     await userModel.create({
        email:email,
        password:password,
        firstName:firstName,
        lastName:lastName
    })
res.json({
msg:'signup endpoint'
})
})
userRouter.post('/signin',async function(req,res){
    const {email,password}=req.body;
    const user=await userModel.findOne({
        email:email,
        password:password
    });
    if(user){
   const token=jwt.sign({
    id:user._id
   },JWT_USER_PASSWORD)

   res.json({
    token:token
})

    }

else{

res.status(403).json({
msg:'incorrect credential'
})
}
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