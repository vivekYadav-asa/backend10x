const {Router}=require('express')
const adminRouter=Router()
const { adminMiddleware}=require('../middleware/admin')
const {adminModel, userMOdel, courseModel}=require('../db')
const jwt=require('jsonwebtoken')
const {JWT_ADMIN_PASSWORD}=require('../config')
const bcrypt =require( 'bcrypt')
const z=require('zod')
const cloudinary = require('cloudinary').v2;


// configure the cloudinary 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
//bcrypt ,zod 
adminRouter.post('/signup', async function(req,res){
const {email,password,firstName,lastName}=req.body;
    //todo:adding zod for validtion
    //todo hash the password so plaintext pw is not stored in the db
    // todo :put inside a try catch block
    const reqBody = z.object({
        email: z.string().includes('@'),
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

    //2. Hash the password
    const hashPassword = await bcrypt.hash(password, 5)
    try {
        await adminModel.create({
            email: email,
            password: hashPassword,
            firstName: firstName,
            lastName: lastName
        })
    } catch (e) {
        console.log("Error: ", e);
    }

   
res.json({
    message:'Admin signed up'
})
})
adminRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({
        email: email
    })
    if (!admin) {
        return res.status(403).json({
            msg: "Invalid admin"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password)
    if (!isPasswordValid) {
        return res.status(403).json({
            msg: "Invalid password"
        })
    }

    //3. sign jwt token
    const token = jwt.sign({
        id: admin._id
    }, JWT_ADMIN_PASSWORD)

    res.json({
        token: token,
        msg: "Admin signed in"
    })

})

adminRouter.post('/course', adminMiddleware, async function(req,res){
    const adminId=req.userId
    const {title ,description,imageUrl,price, cretorId}=req.body
    const course=await courseModel.create({
     title,
     description,
     imageUrl,
     price,
     cretorId
    })

res.json({
   message:'course created',
   courseId:course._id
})
})
adminRouter.put('/course',adminMiddleware,async function(req,res){
  const adminId=req.userId
  
    const {title ,description,imageUrl,price, courseId}=req.body
    const course=await courseModel.updateOne({
        _id:courseId,
        cretorId:adminId
    },
        {
     title,
     description,
     imageUrl,
     price
    })

res.json({
   message:'course updated ',
   courseId:course._id
})

})
adminRouter.get('/course/bulk', async function(req,res){
    const adminId=req.userId;
    const courses=await courseModel.find({
        cretorId:adminId
    })
res.json({
    message:'all the courses',
    courses 
})
})

adminRouter.post('/course/:courseId/content',adminMiddleware,  async (req, res) => {
    const { courseId } = req.params;
  

    try {
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        // if (course.cretorId.toString() !== req.userId) {
        //     console.log(course.cretorId.toString() )
        //     return res.status(403).json({ message: 'Unauthorized' });
        // }

        // Upload to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(url, {
            resource_type: type === 'video' ? 'video' : 'image',
            folder: 'course-content' 
        });

        course.content.push({
            type,
            cloudinaryUrl: cloudinaryResponse.secure_url,
            cloudinaryPublicId: cloudinaryResponse.public_id,
            title,
            description
        });

        await course.save();

        res.json({ message: 'Content added to course', course });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message }); // Include error message
    }
});

module.exports={
    adminRouter:adminRouter
}
