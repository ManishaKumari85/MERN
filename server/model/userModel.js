import mongoose from "mongoose";
const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true, 
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    
     password: {
        type: String,
        required: true,
        minlength: 6
    },
    token:{
        type:String, 
    },
   
    phoneNO:{
        type:Number,
        required:true, 
    },
    
    reffrealCode:{
        type:Number,
        required:true,     
    },
   

    isAdmin:{
        type:Boolean,
        default:false,    
     }

},{timestamps:true})

export default mongoose.model("users",userSchema)


