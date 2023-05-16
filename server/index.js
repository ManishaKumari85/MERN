import express from "express";
const app = express();
import dotenv from "dotenv"
dotenv.config();
import connectDb from "./dbConnection/db.js";
import router from "./router/route.js";
import cors from "cors"
app.use(cors());


 const MONGO_URL = process.env.MONGO_URL
 app.use(express.urlencoded({extended:true}));
 connectDb(MONGO_URL)



app.use(express.json());
app.use("/",router)


const port = process.env.PORT;
 app.listen(port,()=>{
    console.log(`server is running on ${port}`)
 })