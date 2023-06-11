import express from "express";
const app = express();
import dotenv from "dotenv"
dotenv.config();
import connectDb from "./dbConnection/db.js";
import userRoute from "./router/userRoute.js"
import adminRoute from "./router/adminRoute.js"

import cors from "cors"
app.use(cors());




app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/",userRoute)
app.use("/",adminRoute)

//static image folder
 app.use("/images",express.static("./images"))


 const MONGO_URL = process.env.MONGO_URL
 app.use(express.urlencoded({extended:true}));
 connectDb(MONGO_URL)
 





 const port = process.env.PORT;
 app.listen(port,()=>{
    console.log(`server is running on ${port}`)
 })