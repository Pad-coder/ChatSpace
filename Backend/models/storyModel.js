import mongoose from "../MongoDb/connectDb.js";

const storySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    mediaUrl: { type: String, required: true },
    mediaType: { type: String, enum: ["image", "video"], required: true },
    createdAt: { type: Date, default: Date.now, expires: "24h" }, // Story expires after 24 hours
  },
  {
    collection: "Story",
  }
);

export default new mongoose.model("Story", storySchema);
