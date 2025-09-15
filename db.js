//define the schema for users Admin course purchases

const mongoose=require('mongoose')
mongoose.connect(process.env.MONGO_URL)
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


const contentSchema = new Schema({
    type: {
        type: String,
        enum: ['video', 'image'],
        required: true
    },
    cloudinaryUrl: { 
        type: String,
        required: true
    },
    cloudinaryPublicId: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    description: {
        type: String
    }
});

const userModel=mongoose.model("user",userSchema);
const adminModel=mongoose.model("admin",adminSchema);
const courseModel=mongoose.model("course",courseSchema);
const purchaseModel=mongoose.model("purchase",purchaseSchema);
const contentModel=mongoose.model("content",contentSchema)

module.exports={
userModel,
adminModel,
courseModel,
purchaseModel,
contentModel
}