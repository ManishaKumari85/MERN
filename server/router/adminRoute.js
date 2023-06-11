import express from "express"
 const router = express.Router()
// import { requireSignIn,isAdmin } from "../middleware/authMiddleware.js"
import courseController from "../controller/courseController.js"



router.post("/createCourse",courseController.upload,courseController.createCourse)
router.get("/admin/getdata",courseController.getCourse)
router.get("/getdata/:id",courseController.getCoursebyId)
router.put("/updatedata/:id",courseController.upload,courseController.updateCourse)
router.delete("/deleteData/:id",courseController.deleteCourse)


export default router