import { Listing } from "../models/listing.js";
import { Review } from "../models/review.js";

export const getListings = async (req, res) => {
    try {
        const alllistings = await Listing.find({});
        res.status(200).json(alllistings);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getListingById = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from request parameters
        const listing = await Listing.findById(id).populate("owner", "name"); // Populate owner field with user data

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        res.status(200).json(listing);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createListing = async (req, res) => {
    try {
        const { title, description, price, country, location } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }
        const imageUrl = req.file.path; // Assuming you're using multer for file uploads
        const imageFilename = req.file.filename; // Assuming you're using multer for file uploads
        const img = {
            url: imageUrl,
            filename: imageFilename,
        };

        const newListing = new Listing({
            title,
            description,
            price,
            location,
            country,
            image: img,
          });

        newListing.owner = req.user._id;
        await newListing.save();
        res.status(201).json(newListing);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const editListing = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, country, location } = req.body;

        let image = null; // Initialize image variable
        if (req.file) { // Check if a new image is uploaded
            image = {
                url: req.file.path, // Assuming you're using multer for file uploads
                filename: req.file.filename, // Assuming you're using multer for file uploads
            };
        }

        const updatedListing = await Listing.findByIdAndUpdate(
            id, { title, description, image, price, country, location }
        );

        if (!updatedListing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        res.status(200).json(updatedListing); // ✅ Return updated listing
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const deleteListing = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the listing
        const deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        if (!deletedListing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        // Delete all related reviews
        for (let reviewId of deletedListing.reviews) {
            await Review.findByIdAndDelete(reviewId);
        }

        res.status(200).json({ message: "Listing deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const addReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment, rating } = req.body;

        const newReview = new Review({
            comment,
            rating,
        });
        newReview.author = req.user._id;

        await newReview.save();

        // Find listing by ID
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        // Add review to listing
        listing.reviews.push(newReview._id); // ✅ Push ObjectId, not full review object
        await listing.save(); // ✅ Save listing with updated reviews

        res.status(201).json(newReview);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getReviews = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id)
            .populate({
                path: "reviews",
                populate: { path: "author", select: "name" }
            });

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        res.status(200).json(listing.reviews);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


export const deleteReviews = async (req, res) => {
    try {
        const { id, reviewid } = req.params;
        const listing = await Listing.findById(id);

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        // Remove review from listing
        listing.reviews.pull(reviewid); // ✅ Pull ObjectId, not full review object
        await listing.save(); // ✅ Save listing with updated reviews

        // Delete review from Review collection
        await Review.findByIdAndDelete(reviewid);

        res.status(200).json({ message: "Review deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}