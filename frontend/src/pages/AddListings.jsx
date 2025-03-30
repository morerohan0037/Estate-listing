import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AddListings = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
    const { user } = useAuth();
    const [imageFile, setImageFile] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);

    const onSubmit = async (data) => {
        try {
            if (!user) {
                alert("You must be logged in to add a new listing");
                navigate("/login");
                return;
            }
            const token = localStorage.getItem("token");
            
            if (!imageFile) {
                alert("Please upload an image.");
                return;
            }

            const formData = new FormData();
            formData.append("image", imageFile);
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("price", data.price);
            formData.append("location", data.location);
            formData.append("country", data.country);

            const response = await fetch("http://localhost:3000/api/listings/new", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                credentials: "include",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let result = await response.json();
            console.log("Response:", result);

            reset();
            setImageFile(null);
            setPreviewURL(null);
            navigate("/listings");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewURL(URL.createObjectURL(file));
            console.log("Selected file:", file);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Listing</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-1">Title</label>
                        <input type="text" id="title" {...register("title", { required: "This field is required" })} className="border border-gray-300 p-2 w-full rounded-md" placeholder="Enter title" />
                        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Description</label>
                        <textarea id="description" {...register("description", { required: "This field is required" })} className="border border-gray-300 p-2 w-full rounded-md h-24 resize-none" placeholder="Enter description" />
                        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-gray-700 font-medium mb-1">Price (₹)</label>
                        <input type="number" id="price" {...register("price", { required: "This field is required", min: { value: 1, message: "Price must be greater than 0" } })} className="border border-gray-300 p-2 w-full rounded-md" placeholder="Enter price" />
                        {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
                    </div>

                    <div>
                        <label htmlFor="location" className="block text-gray-700 font-medium mb-1">Location/City</label>
                        <input type="text" id="location" {...register("location", { required: "This field is required" })} className="border border-gray-300 p-2 w-full rounded-md" placeholder="Enter city" />
                        {errors.location && <span className="text-red-500 text-sm">{errors.location.message}</span>}
                    </div>

                    <div>
                        <label htmlFor="country" className="block text-gray-700 font-medium mb-1">Country</label>
                        <input type="text" id="country" {...register("country", { required: "This field is required" })} className="border border-gray-300 p-2 w-full rounded-md" placeholder="Enter country" />
                        {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="image" className="text-gray-700 font-semibold">Upload Image</label>
                        <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg hover:border-gray-500 transition">
                            <input type="file" accept="image/*" id="image" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            <span className="text-gray-500 font-medium">Click to upload or drag and drop</span>
                        </div>
                        {previewURL && <img src={previewURL} alt="Preview" className="w-full h-40 object-cover rounded-md shadow-md" />}
                    </div>

                    <button type="submit" className={`w-full text-white font-semibold py-2 px-4 rounded-md transition duration-300 ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"}`} disabled={isSubmitting}>
                        {isSubmitting ? "Adding New Listing..." : "Add"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddListings;
