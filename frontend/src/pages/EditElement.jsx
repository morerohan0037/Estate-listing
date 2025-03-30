import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";

const EditElement = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm();
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // ✅ State for image preview
    
    useEffect(() => {
        const fetchListing = async () => {
            try {
                let response = await fetch(`http://localhost:3000/api/listings/${id}`);
                let data = await response.json();

                // ✅ Populate form fields
                reset(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching listing:", error);
                setLoading(false);
            }
        };
        fetchListing();
    }, [id, reset]);

    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // ✅ Set image preview URL
            };
            reader.readAsDataURL(file);
        }
    };
    

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem("token"); // Get JWT
            if (!token) {
                alert("You must be logged in to edit a listing");
                navigate("/login");
                return;
            }

            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("price", data.price);
            formData.append("location", data.location);
            formData.append("country", data.country);

            if (selectedImage) {
                formData.append("image", selectedImage); // Attach new image if selected
            }

            let response = await fetch(`http://localhost:3000/api/listings/${id}/edit`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,  // ✅ Send token in request
                },
                credentials: "include",
                body: formData, // ✅ Send as FormData for image upload
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let result = await response.json();
            console.log(result);

            reset();  // ✅ Clear form after submission
            navigate("/listings");  // ✅ Redirect after update
        } catch (error) {
            console.error(error);
            alert("Failed to update listing.");
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Your Listing</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
                    {/* Title Input */}
                    <div>
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-1">Title</label>
                        <input
                            type="text"
                            id="title"
                            {...register("title", { required: "This field is required" })}
                            className="border border-gray-300 p-2 w-full rounded-md"
                        />
                        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                    </div>

                    {/* Description Input */}
                    <div>
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Description</label>
                        <textarea
                            id="description"
                            {...register("description", { required: "This field is required" })}
                            className="border border-gray-300 p-2 w-full rounded-md h-24 resize-none"
                        />
                        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                    </div>

                    {/* Price Input */}
                    <div>
                        <label htmlFor="price" className="block text-gray-700 font-medium mb-1">Price (₹)</label>
                        <input
                            type="number"
                            id="price"
                            {...register("price", { required: "This field is required" })}
                            className="border border-gray-300 p-2 w-full rounded-md"
                        />
                        {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
                    </div>

                    {/* Location Input */}
                    <div>
                        <label htmlFor="location" className="block text-gray-700 font-medium mb-1">Location/City</label>
                        <input
                            type="text"
                            id="location"
                            {...register("location", { required: "This field is required" })}
                            className="border border-gray-300 p-2 w-full rounded-md"
                        />
                        {errors.location && <span className="text-red-500 text-sm">{errors.location.message}</span>}
                    </div>

                    {/* Country Input */}
                    <div>
                        <label htmlFor="country" className="block text-gray-700 font-medium mb-1">Country</label>
                        <input
                            type="text"
                            id="country"
                            {...register("country", { required: "This field is required" })}
                            className="border border-gray-300 p-2 w-full rounded-md"
                        />
                        {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
                    </div>

                    {/* Image Upload Input */}
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="image" className="text-gray-700 font-semibold">Upload New Image</label>

                        <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg hover:border-gray-500 transition">
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <span className="text-gray-500 font-medium">Click to upload or drag and drop</span>
                        </div>

                        {/* ✅ Display image preview */}
                        {imagePreview && (
                            <div className="mt-3">
                                <p className="text-gray-600 text-sm">Preview:</p>
                                <img src={imagePreview} alt="Selected" className="w-full max-h-60 object-cover rounded-lg shadow-md" />
                            </div>
                        )}
                    </div>



                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full text-white font-semibold py-2 px-4 rounded-md transition duration-300 
              ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default EditElement;
