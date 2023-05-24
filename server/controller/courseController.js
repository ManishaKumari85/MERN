import courseModel from "../model/courseModel.js";

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
    if (!CourseName) return res.send({ message: "Coursename is required" });
    if (!Description) return res.send({ message: "description is required" });
    if (!CourseAmmount) return res.send({ message: "ammount is required" });
    if (!CourseDuration) return res.send({ message: "duartion is required" });
    if (!CourseDetails)
      return res.send({ message: "CourseDetails is required" });

    const user = await new courseModel({
      CourseName,
      CourseDuration,
      CourseAmmount,
      CourseDetails,
      Description,
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

const updateCourse = async function (req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedDetails = await courseModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          CourseName: data.CourseName,
          CourseDuration: data.CourseDuration,
          CourseAmmount: data.CourseAmmount,
          CourseDetails: data.CourseDetails,
          Description: data.Description,
        },
      },
      {new:true, upsert:true }
    );
    res
      .status(200)
      .send({
        status: true,
        message: "Your course is updated",
        data: updatedDetails,
      });
    console.log(updatedDetails);
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, msg: err.message });
  }
};

const deleteCourse = async function (req, res) {
  try {
    const { id } = req.params;

    const deletuser = await courseModel.findByIdAndDelete({ _id: id });
    console.log(deletuser);

    res
      .status(200)
      .send({
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
  getCourse,
  getCoursebyId,
  updateCourse,
  deleteCourse,
};
