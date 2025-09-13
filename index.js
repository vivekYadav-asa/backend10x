const express=require('express')
const {userRouter}=require('./routers/user')
const {courseRoute}=require('./routers/course')
const app=express()
// create a route for login signin ,purchase the courses,see the all course and see the purched courses
app.use("/user",userRouter)
app.use("/course",courseRouter)

createUserRoute(app)
createCourseRoute(app)

app.listen(3000) 