import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import db from "./connectdb/db.js"
import userRouter from "./routes/user.route.js"

dotenv.config()

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(
    cors({
      origin: [process.env.BASE_URL,"localhost:3000","http://localhost:5173"],
      credentials: true,
      methods: ["GET", "POST", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );


const port = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("welcome");
})

app.use("/api/v1/users",userRouter)

//connect to db
db();

app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})