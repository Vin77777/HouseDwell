import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"

import db from "./connectdb/db.js"

import userRouter from "./routes/user.route.js"
import predictRouter from "./routes/predict.route.js"
import propertyRouter from "./routes/property.route.js"
import ownerRouter from "./routes/owner.route.js"
import inquiryRouter from "./routes/inquiry.route.js"

import axios from "axios"
dotenv.config()

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

// Make 'uploads' folder publicly accessible
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use(
    cors({
      origin: [process.env.BASE_URL,"localhost:3000","http://localhost:5173"],
      credentials: true,
      methods: ["GET", "POST", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );


const port = process.env.PORT || 3000;

app.get("/",async(req,res)=>{
  
  const response = await axios.get("http://localhost:8000");
    const data = await response.data;
    res.send(data.message);
})

app.use("/api/v1/users",userRouter)
app.use("/api/v1/user",predictRouter)
app.use("/api/v1/",propertyRouter)
app.use("/api/v1/owner",ownerRouter)
app.use("/api/v1/inquiry",inquiryRouter)

//connect to db
db();

app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})
