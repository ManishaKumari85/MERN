import mongoose from  "mongoose";
const courseSchema = new mongoose.Schema({
    Coursename:{
    type:String,
    required:true
},

description:{
    type:String,
    required:true
},
ammount:{
    type:Number,
    required:true
},

duartion:{
    type:String,
    required:true
},

},{timestamps:true})


export default mongoose.model("course",courseSchema)