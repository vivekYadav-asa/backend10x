require('dotenv').config()
const express=require('express')
const {userRouter}=require('./routers/user')
const {courseRouter}=require('./routers/course')
const {adminRouter}=require('./routers/admin')
const mongoose=require('mongoose')
const app=express()
const cors = require('cors');
app.use(cors());


app.use(cors()); // Enable CORS for all origins (for testing only!)

app.use(express.json());
// create a route for login signin ,purchase the courses,see the all course and see the purched courses
app.use("/api/v1/user",userRouter)
app.use("/api/v1/course",courseRouter)
app.use("/api/v1/admin",adminRouter)


//dotenv
async function main(){
    
await mongoose.connect(process.env.MONGO_URL)

app.listen(3000,()=>{
    console.log('running on port 3000');
    
}) 
}
main()