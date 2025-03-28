import express from "express"
import dotenv from "dotenv"

import db from "./connectdb/db.js"

import userRouter from "./routes/user.route.js"

dotenv.config()

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const port = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("welcome");
})

app.use("/api/user",userRouter)

//connect to db
db();

app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})