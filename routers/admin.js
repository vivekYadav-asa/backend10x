const {Router}=require('express')
const adminRouter=Router()
const {adminModel, userMOdel, courseModel}=require('../db')
const jwt=require('jsonwebtoken')
const {JWT_ADMIN_PASSWORD}=require('../config')
//bcrypt ,zod 
adminRouter.post('/signup', async function(req,res){
const {email,password,firstName,lastName}=req.body;
    //todo:adding zod for validtion
    //todo hash the password so plaintext pw is not stored in the db
    // todo :put inside a try catch block
     await adminModel.create({
        email:email,
        password:password,
        firstName:firstName,
        lastName:lastName
    })
res.json({
    message:'you are signup succesfully'
})
})
adminRouter.post('/signin',async function(req,res){
    
      const {email,password}=req.body;
    const admin=await adminModel.findOne({
        email:email,
        password:password
    });
    if(admin){
   const token=jwt.sign({
    id:admin._id
   },JWT_ADMIN_PASSWORD)

   res.json({
    token:token
})

    }

else{

res.status(403).json({
msg:'incorrect credential'
})
}

res.json({
    message:'this is signin endpoint'
})
})
adminRouter.post('/', adminMiddleware, async function(req,res){
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
adminRouter.put('/',function(req,res){
res.json({
    message:'this is signin endpoint'
})
})
adminRouter.get('/course/bulk',function(req,res){
res.json({
    message:'this is signin endpoint'
})
})
module.exports={
    adminRouter:adminRouter
}
