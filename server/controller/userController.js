import userModel from "../model/userModel.js";
import userotp from "../model/userotp.js";
import { comparePassword, hashpassword } from "../helpers/authHelpers.js";
import Jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0493d251da5ee4",
    pass: "8c9d9af690683c",
  },
});

const createUser = async function (req, res) {
  try {
    let data = req.body;
    const { name, email, password, phoneNO, reffrealCode } = data;
    console.log(data);
    if (!name) return res.send({ message: "Name is required" });
    if (!email) return res.send({ message: "Email is required" });
    if (!password) return res.send({ message: "Password is required" });
    if (!phoneNO) return res.send({ message: "PhoneNO is required" });
    if (!reffrealCode) return res.send({ message: "ReffrealCode is required" });

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .send({ success: false, message: "Already Register please login" });
    }
    const hashedpassword = await hashpassword(password);
    const user = await new userModel({
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

//  LOGIN   //

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(404)
        .send({ success: false, message: "Invalid email or password" });
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "email is not registerd" });

    const match = await comparePassword(password, user.password);
    if (!match)
      return res
        .status(400)
        .send({ success: false, message: "Invalid password" });

    //token
    const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in login", error });
  }
};

// const forgotPasswordController = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) {
//       res.status(401).json({ status: 401, message: "Enter Your Email" });
//     }
//     const user = await userModel.findOne({ email });
//     // Generate token
//     if (user) {
//       const secret = user._id + process.env.JWT_SECRET;
//       const token = Jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });
//       user.resetToken = token;
//       await user.save();
//       const link = `http://localhost:3000/resetpassword/${token}`;
//       console.log(link);
//       // Send email with password reset link
//       const transporter = nodemailer.createTransport({
//         host: "sandbox.smtp.mailtrap.io",
//         port: 2525,
//         auth: {
//           user: "0493d251da5ee4",
//           pass: "8c9d9af690683c",
//         },
//       });
//       const mailOptions = {
//         from: "0493d251da5ee4", // Replace with your own Gmail address
//         to: "manishakumari29101994@gmail.com", // Replace with the recipient's email address
//         subject: "Password reset request",
//         text: `Please use the following link to reset your password: ${process.env.CLIENT_URL}/resetpassword/${token}`,
//       };

//       // Send the email
//       await transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log("Email sent: " + info.response);
//         }
//       });
//       res.send({
//         success: true,
//         message: "Password reset Email Sent...Please Check Your Email",
//         data: user._id,
//       });
//     } else {
//       res.status(400).send({ message: "User not exist" });
//     }
//   } catch (error) {
//     res.status(500).send({ success: false, message: "error" });
//   }
// };
const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(401).send({ status: false, message: "Enter Your Email" });
  }
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      const OTP = Math.floor(100000 + Math.random() * 900000);
      const existmail = await userotp.findOne({ email: email });
      if (existmail) {
        const updateData = await userotp.findByIdAndUpdate(
          { _id: existmail._id },
          {
            otp: OTP,
          },
          { new: true }
        );
        await updateData.save();
      
      const mailOptions = {
        from: "0493d251da5ee4", // Replace with your own Gmail address
        to: "manishakumari29101994@gmail.com", // Replace with the recipient's email address
        subject: "Password reset request",
        text: `OTP:- ${OTP}`,
      };
      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.send({
        success: true,
        message: "Password reset Email Sent...Please Check Your Email",
        data: OTP,
      });
      
      
    }else{
        const saveotp = new userotp({email,otp:OTP})
        await saveotp.save()
      }
    } else {
      res
        .status(400)
        .send({ status: false, message: "This user not exist in our db" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "error" });
  }
};

const ResetPasssword = async (req, res) => {

  const {email,otp} = req.body;
  if(!otp || !email){
    res.status(400).send({success: false, message: "Please enter your otp and email"})
  }
  try{
    const otpverification = await userotp.findOne({email:email});
    if(otpverification.otp === "otp"){
     const preuser = await userModel.findOne({email:email})
     const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      preuser,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        isAdmin: user.isAdmin,
      },
      token,
    });

    }else{
      res.status(400).send({success: false, message: "Invalid otp"})
    }



  }catch (error) {
    console.log(error);
    res.send({ success: false, message: "Invalid Token" });
  }
};

export default {
  createUser,
  loginController,
  ResetPasssword,
  forgotPasswordController,
};
