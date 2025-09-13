const {Router}=require('express')
const courseRouter=Router();

courseRouter.post('/',function(req,res){
res.json({
msg:'signin endpoint'
})
})
courseRouter.get('/purchase',function(req,res){
res.json({
msg:'purchase endpoint'
})
})

module.exports={
courseRouter:courseRouter
}