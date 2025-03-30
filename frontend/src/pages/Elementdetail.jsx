import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext"; // Importing AuthContext for authentication

const ElementDetail = () => {
    const { id } = useParams();
    const [element, setElement] = useState(null);
    const [reviews, setReviews] = useState([]);
    const { user } = useAuth(); // Get user from AuthContext 

    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors, isSubmitting }, reset } = useForm();
    const ratingValue = watch("rating", 3); // Get current rating value


    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/listings/${id}`);
                if (!response.ok) {
                    throw new Error("Listing not found");
                }
                const data = await response.json();
                setElement(data);
            } catch (error) {
                console.error("Error fetching listing:", error);
                setElement(null);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/listings/${id}/reviews`);
                if (!response.ok) {
                    throw new Error("Failed to fetch reviews");
                }
                const data = await response.json();
                setReviews(data); // Store reviews in state
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchListing();
        fetchReviews(); // Fetch reviews when component mounts
    }, [id]);


    const handledelete = async () => {
        try {
            const token = localStorage.getItem("token"); // Get JWT from storage
            if (!token) {
                alert("You must be logged in to delete a listing");
                throw new Error("Must be logged in to delete listing");
            }
            const response = await fetch(`http://localhost:3000/api/listings/${id}/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,  // ✅ Send token in request
                },
                credentials: "include",  // ✅ Needed if using cookies for auth
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            // Remove listing from UI immediately
            setElement(null);

            alert("Listing deleted successfully!");
            navigate("/listings");
        } catch (error) {
            console.error("Error deleting listing:", error);
            alert("Failed to delete listing.");
        }
    };

    if (!element) {
        return <p className="text-center mt-8">No Such Listing Exists</p>;
    }

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem("token"); // Get JWT from storage
            if (!token) {
                alert("You must be logged in to give a review");
                throw new Error("Must be logged in");
            }
            let response = await fetch(`http://localhost:3000/api/listings/${id}/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                credentials: "include",
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            alert("Review submitted successfully!");
            reset();

            // Fetch latest reviews after submitting
            const updatedReviews = await fetch(`http://localhost:3000/api/listings/${id}/reviews`);
            const reviewData = await updatedReviews.json();
            setReviews(reviewData);

        } catch (error) {
            console.error(error);
            alert("Failed to submit review.");
        }
    };

    const handleDeleteReview = async (reviewId) => {
        const token = localStorage.getItem("token"); // Get JWT from storage
        if (!token) {
            alert("You must be logged in to delete a review");
            throw new Error("Must be logged in to delete review");
        }

        const confirmDelete = window.confirm("Are you sure you want to delete this review?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:3000/api/listings/${id}/reviews/${reviewId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                credentials: "include",
            });

            if (!response.ok) throw new Error("Failed to delete review");

            alert("Review deleted successfully!");
            setReviews(reviews.filter((review) => review._id !== reviewId)); // Update state after deletion
        } catch (error) {
            console.error("Error deleting review:", error);
            alert("Failed to delete review.");
        }
    };


    return (
        <>
            {/* Listing Details Section */}
            <div className="container mx-auto p-6 flex flex-col items-center">
                <h1 className="text-3xl font-semibold">{element.title}</h1>
                <h3 className="font-extralight italic mb-4">Listed by {element.owner.name}</h3>

                {/* Centered Image with Space on Left & Right */}
                <img
                    src={element.image.url}
                    alt={element.title}
                    className="w-3/5 max-w-lg h-72 object-cover rounded-lg shadow-md"
                />

                <p className="text-gray-600 mt-3">{element.location}, {element.country}</p>
                <p className="text-purple-600 font-semibold mt-2">₹{element.price.toLocaleString("en-IN")}/day</p>
                <p className="mt-4 text-center px-6">{element.description}</p>

                {/* Buttons */}

                {user && element.owner._id === user.id &&
                    <div className="flex gap-4 mt-6">
                        <Link to={`/listings/${id}/edit`} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 hover:cursor-pointer transition">
                            Edit
                        </Link>
                        <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 hover:cursor-pointer transition" onClick={handledelete}>
                            Delete
                        </button>
                    </div>}
            </div>

            <div className="border-t border-gray-300 my-10 w-4/5 mx-auto"></div>

            {/* Reviews Section */}
            <div className="max-w-4xl mx-auto mt-8 px-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center sm:text-left">Customer Reviews</h2>

                {reviews.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {reviews.map((review) => (
                            <div key={review._id} className="p-4 border rounded-lg shadow-md bg-white transition-transform duration-200 hover:scale-105 relative">
                                <p className="font-semibold text-gray-800">{review.author.name}</p>
                                <p className="text-gray-700 italic">"{review.comment}"</p>
                                <p className="font-semibold text-yellow-500 mt-2">
                                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                </p>

                                {/* Delete Button */}
                                {user && review.author._id === user.id &&
                                    <button
                                        onClick={() => handleDeleteReview(review._id)}
                                        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-600 transition hover:cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                                    </button>}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 italic text-center">No reviews yet. Be the first to review!</p>
                )}
            </div>

            <div className="border-t border-gray-300 my-10 w-4/5 mx-auto"></div>

            {/* Review Form */}
            {user &&
                <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center sm:text-left">Leave a Review</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Responsive Wrapper */}
                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 gap-6">
                            {/* Comment Section */}
                            <div className="flex-1">
                                <label htmlFor="comment" className="block text-gray-700 font-medium mb-1">Comment</label>
                                <textarea
                                    {...register("comment", { required: { value: true, message: "Comment is required" } })}
                                    className="w-full h-24 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                    placeholder="Write your review..."
                                ></textarea>
                                {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>}
                            </div>

                            {/* Rating Section */}
                            <div className="flex-1">
                                <label htmlFor="rating" className="block text-gray-700 font-medium mb-1">Rating</label>
                                <input
                                    type="range"
                                    min={1}
                                    max={5}
                                    step={1}
                                    {...register("rating", { required: { value: true, message: "Rating is required" } })}
                                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                />
                                <span className="block text-lg font-semibold text-gray-800 mt-2">{ratingValue} ⭐</span>
                                {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition duration-200"
                        >
                            Submit
                        </button>
                    </form>
                </div>}
        </>
    );
};

export default ElementDetail;
