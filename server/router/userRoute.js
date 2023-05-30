import express from "express"
const router = express.Router()
import userController from "../controller/userController.js"
import { requireSignIn,isAdmin } from "../middleware/authMiddleware.js"




router.post("/register", userController.createUser)
router.post("/login", userController.loginController)
router.post("/forgotpassword", userController.forgotPasswordController)
router.post("/resetpassword/:id/", userController.ResetPasssword)








export default router












