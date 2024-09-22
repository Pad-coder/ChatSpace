import storyModel from "../models/storyModel.js";
import userModel from "../models/userModel.js";
import cloudinary from "../cloud/cloudinaryConfig.js";

const createStory = async (req, res) => {
  try {
    const { text } = req.body;
    let { img, video } = req.body;

    const userId = req.user._id.toString();
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!text && !img && !video) {
      return res
        .status(400)
        .json({ error: "Please provide at least one media type" });
    }
    
    if (img) {
      const uploadImg = await cloudinary.uploader.upload(img);
      img = uploadImg.secure_url;
    }
    if (video) {
      const uploadVideo = await cloudinary.uploader.upload(video);
      video = uploadVideo.secure_url;
    }
    const newStory = new storyModel({
      user: userId,
      text,
      img,
      video,
    });
    const story = await newStory.save();
    res.status(201).json({ message: "Story created successfully", story });
  } catch (error) {
    console.log("Error in Create story Controller", error.message);
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

const getStory = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const user = await userModel.findById(userId);

    if (userId === storyModel.user) {
      res.status(200).json({});
    }

    const followingIds = user.following.map((following) =>
      following.toString()
    );

    const stories = await storyModel
      .find({ user: { $in: followingIds } })
      .sort({ createdAt: -1 });

    if (stories.length === 0) {
      return res.status(404).json({});
    }
    res.status(200).json(stories);
  } catch (error) {
    console.log("Error in Get story Controller", error.message);
    res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

const deleteStory = async (req,res)=>{
    try {
        const story = await storyModel.findById(req.params.id);
        if (!story) {
            return res.status(404).json({ error: "Story not found" });
        }
        if(story.user.toString() !== req.user._id.toString())
            return res.status(403).json({error: "You are not authorized to delete this story"});
        if(story.img){
            await cloudinary.uploader.destroy(story.img.split("/").pop().split('.')[0]);
        }
        if(story.video){
            await cloudinary.uploader.destroy(post.video.split("/").pop().split('.')[0]);
        }
        await storyModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Story deleted successfully"})
    } catch (error) {
        console.log("Error in Delete story Controller", error.message);
    res.status(500).send({
      message: error.message || "Internal Server Error",
    })
}
}
export default {
  createStory,
  getStory,
  deleteStory
};
