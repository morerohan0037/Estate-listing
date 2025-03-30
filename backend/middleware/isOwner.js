import { Listing } from "../models/listing.js";

export const isOwner = async (req, res,next) => {
    try {
        const { id } = req.params; // Extract listing ID from request parameters
        const listing = await Listing.findById(id); // Find the listing by ID

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" }); // If listing not found, send 404 response
        }
        if (listing.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to perform this action" }); // If user is not the owner, send 403 response
        }
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}