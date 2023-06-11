import mongoose from "mongoose";
const rightuserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true, 
    },
    email:{
        type:String,
        required:true,
    },
    
     password: {
        type: String,
        required: true,
        minlength: 6
    },
   
    phoneNO:{
        type:Number,
        required:true, 
    },
      resetToken:{type:String},

    reffrealCode:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,     
    },
    
    isAdmin:{
        type:Boolean,
        default:false,    
     }

},{timestamps:true})

export default mongoose.model("right",rightuserSchema)


