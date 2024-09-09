import mongoose from "../MongoDb/connectDb.js";

const conversationSchema = new mongoose.Schema({
participants:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
}],
messages:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Message",
    default:[]
    }]
},{
    timestamps: true,
    collection: 'Conversation',
})

export default new mongoose.model("Conversation",conversationSchema)