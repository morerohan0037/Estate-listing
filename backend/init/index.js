import 'dotenv/config'
import mongoose from "mongoose";
import { sampleListings } from "./data.js";
import { Listing } from "../models/listing.js";

const connectDB = async () => {
  try {
    await mongoose.connect("process.env.MONGO_URL");
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

connectDB();

async function init(params) {
    await Listing.deleteMany({})
    sampleListings.forEach((listing) => {
        listing.owner = "67e962f67ef2cc105598cd99" // Replace with a valid user ID
    })
    await Listing.insertMany(sampleListings)
    console.log("test data inserted")
}

init()