import user1Model from "../model/user1Model.js";
import {hashpassword} from "../helpers/authHelpers.js";


   const createUser = async function (req, res) {
    try {
      let data = req.body;
      const {name, email, password, phoneNO, reffrealCode} = data;
      console.log(data);
      if (!name) return res.send({ message: "Name is required" });
      if (!email) return res.send({ message: "Email is required" });
      if (!password) return res.send({ message: "Password is required" });
      if (!phoneNO) return res.send({ message: "PhoneNO is required" });
      if (!reffrealCode) return res.send({ message: "ReffrealCode is required" });
  
      const existingUser = await user1Model.findOne({ email });
      if (existingUser) {
        return res
          .status(200)
          .send({ success: false, message: "Already Register please login" });
      }
      const hashedpassword = await hashpassword(password);
      const user = await new user1Model({
        name,
        email,
        phoneNO,
        reffrealCode,
        password: hashedpassword,
      }).save();
      console.log(user);
      res
        .status(201)
        .send({ success: true, message: "user Register successfully", user });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ success: false, message: "Error in Registeration", error });
    }
  };



  const getuser = async (req,res)=>{
    try {
  const rightData = await user1Model.find({_id:req.body.user1_id}).populate("reffrealCode")
  res
  .status(201)
  .send({ success: true, message: "get data successfully", rightData });
    }catch (error) {
        console.log(error);
        res
          .status(500)
          .send({ success: false, message: "Error in Get user", error });
      }
  }

  const getalluser = async (req,res)=>{
try{
const data = await user1Model.find().populate("reffrealCode")
res
  .status(201)
  .send({ success: true, message: "get  All data successfully", data});


}catch (error) {
        console.log(error);
        res
          .status(500)
          .send({ success: false, message: "Error in Get All user", error });
      }
  }




  
  export default {createUser,getuser,getalluser}

















