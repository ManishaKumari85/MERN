import express from "express"
const router = express.Router()
import userController from "../controller/userController.js"
import user1Controller from "../controller/user1Controller.js"
import user2Controller from "../controller/user2Controller.js"
 
import { requireSignIn,isAdmin } from "../middleware/authMiddleware.js"




router.post("/register", userController.createUser)
router.post("/login", userController.loginController)
router.post("/forgot", userController.forgotPasswordController)
router.post("/resetpassword", userController.ResetPasssword)

//////////////////////////////////////////  user 1  /////////////////////////////////////////////////////////////////////////////////////////
router.post("/signUp", user1Controller.createUser)
router.get("/get",user1Controller.getuser)
router.get("/getall",user1Controller.getalluser)

////////////////////////////////////  user 2 ////////////////////////////////////////////////////////////////////////////////////////////

router.post("/reg",user2Controller.createUser)
router.get("/getdata",user2Controller.getuser)
router.get("/getalldata",user2Controller.getalluser)

export default router












