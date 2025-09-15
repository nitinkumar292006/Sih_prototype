import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB is Connected")
    }catch(err){
        console.log(" Data base error is :", err)
    }
}
export default connectDB