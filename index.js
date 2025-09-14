const express=require('express')
const {userRouter}=require('./routers/user')
const {courseRouter}=require('./routers/course')
const {adminRouter}=require('./routers/admin')
const mongoose=require('mongoose')
const app=express()

app.use(express.json());
// create a route for login signin ,purchase the courses,see the all course and see the purched courses
app.use("/api/v1/user",userRouter)
app.use("/api/v1/course",courseRouter)
app.use("/api/v1/admin",adminRouter)

//dotenv
async function main(){
await mongoose.connect("mongodb+srv://vivek:kT6JEkzeKHtV%40Ht@cluster0.xmpjrxm.mongodb.net./course-app")
app.listen(3000,()=>{
    console.log('running on port 3000');
    
}) 
}
main()