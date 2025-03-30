import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllListings = () => {
  const [allListings, setAllListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/listings");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAllListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">All Listings</h1>

      {allListings.length === 0 ? (
        <p className="text-gray-500">No listings available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allListings.map((listing) => (
            <Link to={`/listings/${listing._id}`} key={listing._id}>
              <div className="bg-white shadow-lg rounded-lg p-4 transition transform hover:scale-105 cursor-pointer">
                <img
                  src={listing.image.url}
                  alt={listing.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h2 className="text-lg font-semibold mt-2">{listing.title}</h2>
                <p className="text-gray-600 text-sm mt-1">
                  {listing.location}, {listing.country}
                </p>
                <p className="text-purple-600 font-semibold mt-2">
                  ₹{listing.price.toLocaleString("en-IN")}/day
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllListings;
