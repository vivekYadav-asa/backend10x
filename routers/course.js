const {Router}=require('express')
const courseRouter=Router();

courseRouter.post('/purchase',function(req,res){
res.json({
msg:'signin endpoint'
})
})
courseRouter.get('/preview',function(req,res){
res.json({
msg:'purchase endpoint'
})
})

module.exports={
courseRouter:courseRouter
}