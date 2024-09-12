import userModel from "../models/userModel.js";
import notificationModel from "../models/notificationModel.js";
import hash from "../encryption/hash.js";
import cloudinary from "../cloud/cloudinaryConfig.js";


const getUserProfile = async(req,res)=>{
    const {username} = req.params;
   
    try{
        const user = await userModel.findOne({username}).select("-password")
        if(!user){
            return res.status(404).send({message:"User not found"})
        }
        res.status(200).send(user)
    }catch(error){
        console.log("Error in User Profile controller", error.message);
        res.status(500).send({
            message: error.message ||  'Internal Server Error'
        })
    }
}

const getSuggestedUser = async(req,res)=>{
    try{
        const userId = req.user._id
        const usersFollowedByMe = await userModel.findById(userId).select("following")

        const user = await userModel.aggregate([
            {
                $match: { _id: { $ne: userId } },
            },
            {
                $sample:{size: 10}
            }
        ])

        const fillteredUsers = user.filter((user)=> !usersFollowedByMe.following.includes(user._id));
        const suggestedUsers = fillteredUsers.slice(0,4);

        suggestedUsers.forEach((user)=> (user.password = null));
        res.status(200).send(suggestedUsers)

    }catch(error){
        console.log("Error in Suggested User Profile controller", error.message);
    }
}

const followUnFollowUser = async (req,res)=>{
    try{
        const {id} = req.params;
        const user = await userModel.findById(id)
        const currentUser = await userModel.findById(req.user._id)
        if(id === req.user._id.toString()){
            return res.status(400).send({message:"You cannot follow yourself"})
        }
        if(!user || !currentUser){
            return res.status(404).send({message:"User not found"})
        }
        const isFollowing = await currentUser.following.includes(id)

        if(isFollowing){

            await userModel.findByIdAndUpdate(id,{$pull:{followers:req.user._id}})
            await userModel.findByIdAndUpdate(req.user._id,{$pull:{following:id}})
            return res.status(200).send({message:"Unfollowed successfully"})

            }else{

                await userModel.findByIdAndUpdate(id,{$push:{followers:req.user._id}})
                await userModel.findByIdAndUpdate(req.user._id,{$push:{following:id}})
                

                const newNotification = new notificationModel({
                    type: 'follow',
                    from: req.user._id,
                    to: user._id
                })
                await newNotification.save()
                return res.status(200).send({message:"Followed successfully"})
            }
    }catch(error){
        console.log("Error in followUnFollowUser controller", error.message);
        res.status(500).send({
            message: error.message || 'Internal Server Error'
        })
    }
}

const updateUserProfile = async(req,res)=>{
    const {name, username, email, currentPassword, newPassword, bio} = req.body;
        let {profile, coverImg} = req.body;

        const userId = req.user._id
    try{
        let user = await userModel.findById(userId)
        if (!user)
            return res.status(404).send({ message: "User not found" });
        if((!newPassword && currentPassword) || (!currentPassword && newPassword)){
            return res.status(400).send({message:"Please enter both current and new password to change"})
        }
        
        
        if(currentPassword && newPassword){
            const isValidPassword = await hash.hashCompare(currentPassword,user.password)
            if(!isValidPassword){
                return res.status(400).send({message:"Invalid current password"})
                }
                
                if(newPassword === currentPassword)
                    return res.status(400).send({message:"New password cannot be same as current password"})

                if(newPassword.length < 6){
                    return res.status(400).send({message:"Password must be at least 6 characters long"})
                }
                const hashedPassword = await hash.hashPassword(newPassword)
                user.password = hashedPassword
        }
        if(profile){
            if(user.profile){
                await cloudinary.uploader.destroy(user.profile.split('/').pop().split('.')[0])
            }
          const uploadImage = await cloudinary.uploader.upload(profile)
          profile = uploadImage.secure_url
        }
        if(coverImg){
            if(user.coverImg){
                await cloudinary.uploader.destroy(user.coverImg.split('/').pop().split('.')[0])
            }
            const uploadImage = await cloudinary.uploader.upload(coverImg)
            coverImg = uploadImage.secure_url
        }

        user.name = name || user.name;
        user.username = username || user.username;
        user.email = email || user.email;
        user.bio = bio || user.bio;
        user.profile = profile || user.profile;
        user.coverImg = coverImg || user.coverImg;

        user = await user.save();

        user.password = null;

        res.status(200).send(user);

    }catch(error){
        console.log("Error in updateUserProfile controller", error.message);
        res.status(500).send({
            message: error.message || 'Internal Server Error'
            });
    }
}

const getUserForSidebar = async(req,res)=>{
    try {
        const loggedInUserId = req.user._id;

        const fillteredUsers = await userModel.find({_id: {$ne: loggedInUserId}}).select("-password")
        res.status(200).json(fillteredUsers)
        
    } catch (error) {
        
    }
}

export default {
    getUserProfile,
    getSuggestedUser,
    followUnFollowUser,
    updateUserProfile,
    getUserForSidebar
}