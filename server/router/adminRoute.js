import express from "express"
const router = express.Router()
import { requireSignIn,isAdmin } from "../middleware/authMiddleware.js"
import courseController from "../controller/courseController.js"






router.post("/createCourse",courseController.createCourse)
router.get("/getdata",courseController.getCourse)
router.get("/getdata/:id",courseController.getCoursebyId)
router.put("/updatedata/:id",courseController.updateCourse)
router.delete("/deleteData/:id",courseController.deleteCourse)


export default router