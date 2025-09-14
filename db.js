//define the schema for users Admin course purchases

const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://vivek:kT6JEkzeKHtV%40Ht@cluster0.xmpjrxm.mongodb.net./course-app")
const Schema=mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId
const userSchema= new Schema({
  
  email:{type:String,unique:true},
    password:String,
    firstName:String,
    lastName:String
}) 
const adminSchema= new Schema({

    email:{type:String,unique:true},
    password:String,
    firstName:String,
    lastName:String
})

const courseSchema=new Schema({
 
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    cretorId:ObjectId
})
const purchaseSchema= new Schema({

    courseId:ObjectId,
    userId:ObjectId
})

const userModel=mongoose.model("user",userSchema);
const adminModel=mongoose.model("admin",adminSchema);
const courseModel=mongoose.model("course",courseSchema);
const purchaseModel=mongoose.model("purchase",purchaseSchema);

module.exports={
userModel,
adminModel,
courseModel,
purchaseModel
}