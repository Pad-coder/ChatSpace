import storyModel from '../models/storyModel.js'
import userModel from '../models/userModel.js'
import cloudinary from '../cloud/cloudinaryConfig.js'

const createStory= async (req,res)=>{
    try{

    }catch(error){
        console.log("Error in Create story Controller", error.message);
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
        
    }
}



export default {
    createStory
}