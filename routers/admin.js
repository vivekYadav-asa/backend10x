const {Router}=require('express')
const adminRouter=Router()
const {adminModel}=require('../db')

adminRouter.post('/signup',function(req,res){
res.json({
    message:'this is signup endpoint'
})
})
adminRouter.post('/signin',function(req,res){
res.json({
    message:'this is signin endpoint'
})
})
adminRouter.post('/course',function(req,res){
res.json({
    message:'this is signin endpoint'
})
})
adminRouter.put('/course',function(req,res){
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
