import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  url: String,
  status: {
    type: String,
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Url", urlSchema);
