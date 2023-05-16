import courseModel from "../model/courseModel.js";

const createCourse = async function (req, res) {

    try {
        let data = req.body
        let {Coursename,description,ammount,duartion} = data
        if (!Coursename) return res.send({ message: "Coursename is required" });
        if (!description) return res.send({ message: "description is required" });
        if (!ammount) return res.send({ message: "ammount is required" });
        if (!duartion) return res.send({ message: "duartion is required" });
    
        const user = await new courseModel({
            Coursename,description,ammount,duartion
          }).save();
          console.log(user);
          res
            .status(201)
            .send({ success: true, message: "Create course successfully", user });
        } catch (error) {
          console.log(error);
          res
            .status(500)
            .send({ success: false, message: "Error in Create course ", error });
        }
      };
      
const getCourse = async function (req, res) {
  try {
 const getData = await courseModel.find();
 res.status(201).send({success:true,message:"Get All Data",data:getData})
 console.log(getData)
 }catch(error){
  console.log(error);
          res
            .status(500)
            .send({ success: false, message: "Error in get data", error });
        }
 }
 
 
 const getCoursebyId = async function(req,res){
  try{
    const {id} = req.params;
    const getdata =await courseModel.findById({_id:id});
    res.status(201).send({success:true,message:" Get All Data by Id",data:getdata})
    console.log(getdata) 

  }catch(error){
  console.log(error);
          res
            .status(500)
            .send({ success: false, message: "Error in get data by Id", error });
        }
 }
 
 const updateCourse = async function(req,res){
 
    
      try {
        const {id} = req.params;

        const updateduser = await courseModel.findByIdAndUpdate(id,req.body,{
            new:true
        });

        res.status(201).send({success:true,message:" update successfully data",data:updateduser})
        console.log(getdata) 

      }catch(error){
        console.log(error);
                res
                  .status(500)
                  .send({ success: false, message: "Error in update Data", error });
              }

            }

   const deleteCourse = async function(req,res){
    try{ 
    const {id} = req.params;

    const deletuser = await courseModel.findByIdAndDelete({_id:id})
    console.log(deletuser);

    res.status(201).send({success:true,message:" delete successfully data",data:deletuser})

    }catch(error){
        console.log(error);
                res
                  .status(500)
                  .send({ success: false, message: "Error in Delete", error });
              }

   }         

      
export default {createCourse,getCourse,getCoursebyId,updateCourse,deleteCourse};
  