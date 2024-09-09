import mongoose from "../MongoDb/connectDb.js";

const storySchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text:{
        type: String,
    },
    img:{
        type: String,   
    }
},{
    timestamp: true,
    collection: "Story"
})

export default new mongoose.model('Story',storySchema)