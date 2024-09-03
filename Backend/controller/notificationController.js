import notificationModel from "../models/notificationModel.js";

const getAllNotification = async(req,res)=>{
    try{
        const userId = req.user._id

        const notifications = await notificationModel.find({to: userId}).populate({
            path: 'from',
            select: "username profile"
        })

        await notificationModel.updateMany({to:userId},{read:true});

        res.status(200).send(notifications)

    }catch(error){
        console.log("Error in Get All Notification Controller", error.message);
        res.status(500).json({message: error.message || "Internal Server Error"});
    }
}
const deleteNotifications = async(req,res)=>{
    try{
        const userId = req.user._id

        await notificationModel.deleteMany({to:userId});

        res.status(200).send({message: "Notification Deleted Successfully"});
    }catch(error){
        console.log("Error in Delete All Notification Controller", error.message);
        res.status(500).json({message: error.message || "Internal Server Error"});
    }
}

const deleteNotification = async(req,res)=>{
    try{
        const {id} = req.params
        const userId = req.user._id
        const notification = await notificationModel.findById(id)

        if(!notification){
            return res.status(404).json({message: "Notification Not Found"})
        }
        if(notification.to.toString() !== userId.toString()){
            return res.status(403).json({message: "You are not authorized to delete this notification"})
        }
        await notificationModel.findByIdAndDelete(id)
        res.status(200).send({message: "Notification Deleted Successfully"});

    }catch(error){
        console.log("Error in Delete Notification Controller", error.message);
        res.status(500).json({message: error.message || "Internal Server Error"});
    }
}
export default {
    getAllNotification,
    deleteNotifications,
    deleteNotification
}