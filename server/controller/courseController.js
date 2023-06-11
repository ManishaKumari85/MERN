import courseModel from "../model/courseModel.js";
import multer from "multer";
import path from "path";
import fs from "fs"


// images controller

  const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
     
      cb(null,"images");
    },
    filename: function (req, file, cb) {
     
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
const upload = multer({ 
    storage: storage,
    limits:{fileSize:'1000000'},
    fileFilter:(req,file,cb)=>{
        const fileTypes = /jpeg |jpg |png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname =fileTypes.test(path.extname(file.originalname))
        if(mimeType && extname){
            return cb(null,true)
        }
        cb("give proper file format to uploads")
    }
 }).single("image") 
//   multiple imges use = .array("image" ,3)

const createCourse = async function (req, res) {
  try {
    let data = req.body;
    let {
      CourseName,
      CourseDuration,
      CourseAmmount,
      CourseDetails,
      Description,
    } = data;

    let image = req.file.path
    
    if (req.file.image && req.file.image.length > 0) {
      imagePath = image[0].path;
    }


    if (
      !CourseName ||
      !CourseDuration ||
      !CourseAmmount ||
      !CourseDetails ||
      !Description ||
      !image
    )
      return res.status(401).send({ success: false, message: "fill all data" });

    const user = await new courseModel({
      CourseName,
      CourseDuration,
      CourseAmmount,
      CourseDetails,
      Description,
      image,
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
    res
      .status(201)
      .send({ success: true, message: "Get All Data", data: getData });
    console.log(getData);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in get data", error });
  }
};

const getCoursebyId = async function (req, res) {
  try {
    const { id } = req.params;
    const getdata = await courseModel.findById({ _id: id });
    res
      .status(201)
      .send({ success: true, message: " Get All Data by Id", data: getdata });
    console.log(getdata);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in get data by Id", error });
  }
};

const updateCourse = async function (req,res,next) {
  const {id } = req.params;
  try{
  const updatedDetails = await courseModel.findOneAndUpdate(
      { _id: id },{
      CourseName:req.body.CourseName,
      CourseDuration:req.body.CourseDuration,
      CourseAmmount:req.body.CourseAmmount,
      CourseDetails:req.body.CourseDetails,
      Description:req.body.Description,
      image:req.file.path
    },{ new: true, upsert: true }
    
)
if (req.file.image && req.file.image.length > 0) {
  imagePath = image[0].path;
}
res.status(200).send({
        status: true,
        message: "Your course is updated",
        data: updatedDetails,
      });
      console.log(updatedDetails);
} catch (err) {
      console.log(err);
      res.status(500).send({ status: false, msg: err.message });
    }
}
  

const deleteCourse = async function (req, res) {
  try {
    const { id } = req.params;

    const deletuser = await courseModel.findByIdAndDelete({ _id: id });
    console.log(deletuser);

    res.status(200).send({
      success: true,
      message: " delete successfully data",
      data: deletuser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in Delete", error });
  }
};






export default {
  createCourse,
  upload,
  getCourse,
  getCoursebyId,
  updateCourse,
  deleteCourse,
};
