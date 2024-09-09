import mongoose from "../MongoDb/connectDb.js";

const notificationSchema = new mongoose.Schema({
    from:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type:{
        type: String,
        enum: ['like', 'follow','comment']
    },
    read:{
        type:Boolean,
        default:false
    }
},{
    timestamps: true,
    collection: 'Notification'
})

export default new mongoose.model("Notification",notificationSchema)