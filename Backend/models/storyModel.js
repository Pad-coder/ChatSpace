import mongoose from "../MongoDb/connectDb.js";

const storySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text:{
      type:String,
    },
    img:{
      type:String,
    },
    video:{
      type:String,
    },
    createdAt: { type: Date, default: Date.now, expires: "24h" }, // Story expires after 24 hours
  },
  {
    collection: "Story",
  }
);

export default new mongoose.model("Story", storySchema);
