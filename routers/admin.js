const {Router}=require('express')
const adminRouter=Router()
const {adminModel, userMOdel}=require('../db')
//bcrypt ,zod 
adminRouter.post('/signup', function(req,res){

res.json({
    message:'you are signup succesfully'
})
})
adminRouter.post('/signin',function(req,res){
    const password=req.body.password
res.json({
    message:'this is signin endpoint'
})
})
adminRouter.post('/',function(req,res){
res.json({
    message:'this is signin endpoint'
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
