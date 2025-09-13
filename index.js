const express=require('express')
const app=express()
// create a route for login signin ,purchase the courses,see the all course and see the purched courses
app.use(express.json())

app.post('/user/signup',function(req,res){
    //signup by using the email and password
    res.json({
        msg:'you are signup'
    })
})

app.post('/user/login',function(req,res){
res.json({
    msg:'u are loged in'
})
})
app.post("/course/purchase",function(req,res){
    res.json({

    })
})
app.get('/user/purchase',function(req,res){
    res.json({

    })
})
app.get('/course',function(req,res){

})
app.listen(3000) 