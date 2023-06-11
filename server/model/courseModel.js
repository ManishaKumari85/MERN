import mongoose from  "mongoose";
const courseSchema = new mongoose.Schema({
    CourseName:{
    type:String,
    required:true
},

Description:{
    type:String,
    required:true
},
image:{
    type:String,
    required:true
  },
CourseAmmount:{
    type:Number,
    required:true
},
CourseDetails:{
    type:String,
    required:true
},

CourseDuration:{
    type:String,
    required:true
},

},{timestamps:true})


export default mongoose.model("course",courseSchema)