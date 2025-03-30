import mongoose, { Schema } from "mongoose";

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "No description provided" },
  image: {
    url: { type: String, required: true },  // Store Cloudinary image URL
    filename: { type: String, required: true } // Store Cloudinary public ID
  },
  price: { type: Number, required: true, min: 0 },
  location: { type: String, required: true },
  country: { type: String, required: true },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
}, { timestamps: true });

export const Listing = mongoose.model("Listing", listingSchema);
