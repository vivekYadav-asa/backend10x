const {Router}=require('express')
const courseRouter=Router();
const { userMiddleware}=require('../middleware/user')
const {purchaseModel, courseModel}=require('../db')
courseRouter.post('/purchase',userMiddleware,async function(req,res){
const userId=req.userId
const courseId=req.body.courseId
await purchaseModel.create({
userId,
courseId
})
res.json({
msg:'u have succesfully bought the course'
})
})
courseRouter.get('/preview',function(req,res){
const courses=courseModel.find({})

res.json({
    message:'coourse created successfully ',
courses
})
})

module.exports={
courseRouter:courseRouter
}