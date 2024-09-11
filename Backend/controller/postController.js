import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import notificationModel from '../models/notificationModel.js'
import cloudinary from "../cloud/cloudinaryConfig.js";

const createPost = async (req,res)=>{
    try{

        const {text}= req.body;
        let {img} = req.body;
        
        const userId = req.user._id.toString()

        const user = await userModel.findById(userId)
        if(!user) return res.status(404).json({message: "User not found"});

        if(!text && !img){
            return res.status(400).json({error: "Please provide either text or image"})
        }
            if(img){
                const uploadedImg = await cloudinary.uploader.upload(img);
                img = uploadedImg.secure_url;
            }

        const newPost = new postModel({
            user:userId,
            text,
            img,
        })

        await newPost.save()
        res.status(201).json(newPost)
    }catch(error){
        console.log("Error in Create post controller", error.message);
        res.status(500).json({
            error: 'Internal Server Error'
            });
    }
}

const deletePost = async (req,res)=>{
    try{
        const post = await postModel.findById(req.params.id);
        if(!post)
            return res.status(404).json({error: "Post not found"});

        if(post.user.toString() !== req.user._id.toString())
            return res.status(403).json({error: "You are not authorized to delete this post"});

        if(post.img){
            await cloudinary.uploader.destroy(post.img.split("/").pop().split('.')[0]);
        }

        await postModel.findByIdAndDelete(req.params.id);

        res.status(200).json({message: "Post deleted successfully"})
    }catch(error){
        console.log("Error in Delete Post Controller : ", error);
        res.status(500).send({
            error: 'Internal Server Error'
        })
    }
}

const commentPost = async(req,res)=>{
    try{
        const {text} = req.body;
        const postId  = req.params.id;
        const userId = req.user._id.toString();

        if(!text){
            return res.status(400).json({error: "Please enter a comment"});
        }
        const post = await postModel.findById(postId)
        if(!post){
            return res.status(404).json({error: "Post not found"});
        }

        const comment = {user:userId, text};
        post.comments.push(comment);
        await post.save();

        if(userId !== post.user){
        const notification = new notificationModel({
            from:userId,
            to:post.user,
            type:'comment'
        })
        await notification.save();
    }
         res.status(201).json({message:"Comment added successfully"})
    }catch(error){
        console.log("Error in Comment Post Controller : ", error);
        res.status(500).send({
            error: 'Internal Server Error'
        })
    }
}

const likeUnlikePost = async(req,res)=>{
    try{
        const {id:postId} = req.params;
        const userId = req.user._id;

        const post = await postModel.findById(postId);

        if(!post){
            return res.status(404).json({error: "Post not found"});
        }

        const isLikedPost = post.likes.includes(userId)

        if(isLikedPost){
            //Unlike the post 
            await postModel.updateOne({_id:postId},{$pull:{likes:userId}})
            await userModel.updateOne({_id:userId},{$pull:{likedPosts: postId}})

            const updatedLikes = post.likes.filter((id)=> id.toString() !== userId.toString())

            res.status(200).json(updatedLikes)
        }else{
            //Like the post
            post.likes.push(userId);
            await userModel.updateOne({_id:userId},{$push:{likedPosts: postId}})
            await post.save();

            if(userId !== post.user){
            const notification = new notificationModel({
                from: userId,
                to: post.user,
                type: 'like'
            })
            await notification.save();

            const updatedLikes = post.likes
            res.status(200).json(updatedLikes)
        }
        }

    }catch(error){
        console.log("Error in Like Unlike Post Controller : ", error);
        res.status(500).send({
            error: 'Internal Server Error'
        })
    }
}

const getAllPost = async(req,res)=>{
    try{
        const posts = await postModel.find().sort({createdAt: -1}).populate({
            path: 'user',
            select: "-password",
        })
        .populate({
            path:"comments.user",
            select:"-password"
        })

        if(posts.length === 0){
            return res.status(200).send([])
        }
        res.status(200).json(posts)

    }catch(error){
        console.log("Error in Get All Post Controller : ", error);
        res.status(500).send({
            error:'Internal Server Error'
            })
    }
}

const getLikedPosts = async(req,res)=>{
    const userId = req.params.id
    try{
        const user = await userModel.findById(userId)
        if(!user)
            return res.status(404).send({error: "User not found"})
        const likedPosts = await postModel.find({_id:{$in: user.likedPosts}})
        .populate({
            path: 'user',
            select: "-password",
        })
        .populate({
            path: "comments.user",
            select: "-password"
            })
            res.status(200).json(likedPosts)
        
    }catch(error){
        console.log("Error in Get Liked Posts Controller");
        res.status(500).send({
            error: 'Internal Server Error'
            })
    }
}

const getFollowingPosts = async(req,res)=>{
    try{
        const userId = req.user._id;
        const user = await userModel.findById(userId)
        
        if(!user) return res.status(404).send({error: "User not found"})
            const following = user.following;

        const feeds = await postModel.find({user:{$in: following}})
        .sort({createdAt: -1})
        .populate({
            path: 'user',
            select: "-password",
            })
            .populate({
                path:"comments.user",
                select:"-password"
            });
            res.status(200).json(feeds);

    }catch(error){
        console.log("Error in Get Following Posts Controller");
        res.status(500).send({
           error:'Internal Server Error'
            })
    }
}

const getUserPosts = async (req,res) =>{
    try{ 
        const {username} = req.params;

        const user = await userModel.findOne({username})

        if(!user) return res.status(404).send({error: "User not found"})

            const posts = await postModel.find({user: user._id}).sort({createdAt: -1})
            .populate({
                path: "user",
                select: "-password",
            })
            .populate({
                path: "comments.user",
                select: "-password"
                });
                res.status(200).json(posts);

    }catch(error){
        console.log("Error in Get User Posts Controller");
        res.status(500).send({
            error:'Internal Server Error'
        })      
    }
}

export default {
    createPost,
    deletePost,
    likeUnlikePost,
    commentPost,
    getAllPost,
    getLikedPosts,
    getFollowingPosts,
    getUserPosts
}