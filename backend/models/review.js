import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  createdAt: { type: Date, default: Date.now },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
}, { timestamps: true });

export const Review = mongoose.model("Review", reviewSchema);
