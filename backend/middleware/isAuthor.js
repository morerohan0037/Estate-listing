import { Review } from "../models/review.js";

export const isAuthor = async (req, res, next) => {
    try {
        const { id, reviewid } = req.params; // Extract listing ID and review ID from request parameters
        const review = await Review.findById(reviewid); // Find the review by ID

        if (!review) {
            return res.status(404).json({ message: "Review not found" }); // If review not found, send 404 response
        }
        if (review.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to perform this action" }); // If user is not the author, send 403 response
        }
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}