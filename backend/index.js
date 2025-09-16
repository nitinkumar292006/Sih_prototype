import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path"

dotenv.config();
 
const app = express();

const _dirname = path.resolve();

const port = process.env.PORT || 4000;
app.use(express.json())
app.use(cors({
    origin:"https://sih-prototype-zkpp.onrender.com",
    credentials:true
}))
app.use(cookieParser())
app.use("/api",authRouter);

app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get((_,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
})

app.listen(port,()=>{
    connectDB();
    console.log(`server is start at http://localhost:${port}`)
})