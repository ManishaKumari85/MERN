import express from "express"
const router = express.Router()
import userController from "../controller/userController.js"
import { requireSignIn,isAdmin } from "../middleware/authMiddleware.js"
import courseController from "../controller/courseController.js"

/////////////user////////////////

router.post("/register", userController.createUser)
router.post("/login", userController.loginController)
router.post("/forgotpassword", userController.forgotPasswordController)
router.post("/resetpassword/:id/", userController.ResetPasssword)




//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });
  
  
  // //protected Admin route auth
  router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });

/////////////////////////////////////////////////////////////////course api /////////////////////////////////////////////////////////////////////////

router.post("/createCourse",courseController.createCourse)
router.get("/getdata",courseController.getCourse)
router.get("/getdata/:id",courseController.getCoursebyId)
router.put("/updatedata/:id",courseController.updateCourse)
router.delete("/deleteData/:id",courseController.deleteCourse)


export default router
