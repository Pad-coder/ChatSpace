import storyModel from '../models/storyModel.js'
import userModel from '../models/userModel.js'
import cloudinary from '../cloud/cloudinaryConfig.js'

const createStory= async (req,res)=>{
    try{
        const {text}= req.body;
        let {img,video} = req.body;
        
        const userId = req.user._id.toString()
        const user = await userModel.findById(userId)
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        if(!text || img || video){
            return res.status(400).json({message: "Please enter text and select image or video"})
        }
        if(img && video){
            return res.status(400).json({message: "Please select either image or video"})
        }
        if(img){
            const uploadImg = await cloudinary.uploader.upload(img);
            img = uploadImg.secure_url
        }
        if(video){
            const uploadVideo = await cloudinary.uploader.upload(video);
            video = uploadVideo.secure_url
        }
        const newStory = new storyModel


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