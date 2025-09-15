import { v2 as Cloudinary } from "cloudinary"
import fs from "fs"

Cloudinary.config({
    cloud_name: process.env.COULDINARY_NAME,
    api_key: process.env.COULDINARY_API_KEY,
    api_secret: process.env.COULDINARY_SECERATE_KEY
});

const uploadIonCloudinary = async (filePath)=>{
    try{
        if(!filePath){
            return null;
        }
        let result = Cloudinary.uploader.upload(filePath);
        console.log(result);
        fs.unlinkSync(filePath);
        return result.secure_url;

    }catch(err){
        fs.unlinkSync(filePath);
        console.log("error :",err);
    }
}

export default uploadIonCloudinary