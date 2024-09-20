import messageModel from "../models/messageModel.js";
import conversationModel from "../models/conversationModel.js";
import { getReceiverSocketId } from "../socket/socket.js";

const sendMessage = async(req,res)=>{
    try {
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await conversationModel.findOne({
            participants : {$all:[senderId,receiverId]},
        })

        if(!conversation){
            conversation = await conversationModel.create({
                participants : [senderId,receiverId],
            })
        }
        const newMessage = new messageModel({
            senderId,
            receiverId,
            message,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }
        await Promise.all([conversation.save(),newMessage.save()])

        //Socket io functionalities

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage',newMessage); // Used to send events to specific client
        }


        res.status(201).json(newMessage)
        
    } catch (error) {
        console.log("Error in Send Message Controller", error)
        res.status(500).send({
            error:"Internal Server Error"
        })
    }
}

const getMessages = async(req,res)=>{
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await conversationModel.findOne({
            participants: {$all: [senderId,userToChatId]}
        }).populate("messages");

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in Get Messages Controller", error)
        res.status(500).send({
            error:"Internal Server Error"
        })
    }
}
export default {
    sendMessage,
    getMessages
}