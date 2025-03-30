import express from "express";
import { getListings, getListingById, createListing, editListing, deleteListing, addReview, getReviews, deleteReviews } from "../controllers/listingController.js";
import passport from "passport";
import { isOwner } from "../middleware/isOwner.js";
import { isAuthor } from "../middleware/isAuthor.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// Define API routes
router.get("/", getListings);
router.post("/new", passport.authenticate("jwt", { session: false }), upload.single("image"), createListing)

router.get("/:id", getListingById);

router.put("/:id/edit", passport.authenticate("jwt", { session: false }), isOwner,upload.single("image"), editListing);

router.delete("/:id/delete", passport.authenticate("jwt", { session: false }), isOwner, deleteListing);

router.post("/:id/reviews", passport.authenticate("jwt", { session: false }), addReview);
router.get("/:id/reviews", getReviews);

router.delete("/:id/reviews/:reviewid", passport.authenticate("jwt", { session: false }), isAuthor, deleteReviews);

export default router;