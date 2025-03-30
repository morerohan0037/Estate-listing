# EarthlyStays - Travel Planner

EarthlyStays is a full-stack web application designed to help users explore, list, and book unique travel accommodations. The platform allows users to browse listings, add their own properties, and leave reviews for others.

## Features

### Backend
- **Authentication**: User signup, login, and JWT-based authentication.
- **Listings Management**: Create, edit, delete, and view travel listings.
- **Reviews**: Add, view, and delete reviews for listings.
- **Image Upload**: Cloudinary integration for image storage.
- **Role-Based Access**: Middleware to ensure only owners can edit/delete their listings and only authors can delete their reviews.

### Frontend
- **Responsive Design**: Built with React and TailwindCSS for a seamless user experience.
- **Protected Routes**: Certain actions (e.g., adding/editing listings) require authentication.
- **Dynamic Forms**: Forms for adding/editing listings and submitting reviews.
- **Interactive UI**: Smooth navigation and user-friendly interface.

## Tech Stack

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **Passport.js** for authentication
- **Cloudinary** for image storage
- **Multer** for file uploads

### Frontend
- **React.js** with **React Router**
- **TailwindCSS** for styling
- **React Hook Form** for form handling
- **Vite** for development and build tooling

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB instance (local or cloud-based)
- Cloudinary account for image storage

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables:
   ```env
   MONGO_URL=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
   CLOUDINARY_API_KEY=<your_cloudinary_api_key>
   CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
   FRONTEND_URL=http://localhost:5173
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Access the Application
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3000](http://localhost:3000)

## Project Structure

### Backend
- **`config/`**: Configuration files (e.g., Cloudinary, Passport).
- **`controllers/`**: Business logic for routes.
- **`middleware/`**: Custom middleware for authentication and authorization.
- **`models/`**: Mongoose schemas for `User`, `Listing`, and `Review`.
- **`routes/`**: API route definitions.
- **`init/`**: Sample data initialization scripts.

### Frontend
- **`src/components/`**: Reusable UI components (e.g., Navbar, Footer).
- **`src/context/`**: Context API for global state management (e.g., AuthContext).
- **`src/pages/`**: Page components for different routes (e.g., Home, Login, Signup).
- **`src/utils/`**: Utility functions (e.g., token management).

## Usage

### Adding a Listing
1. Log in or sign up for an account.
2. Navigate to the "Add Listing" page.
3. Fill out the form and upload an image.
4. Submit the form to create a new listing.

### Editing or Deleting a Listing
1. Navigate to the listing's detail page.
2. If you are the owner, you will see options to edit or delete the listing.

### Adding a Review
1. Navigate to a listing's detail page.
2. Scroll down to the "Leave a Review" section.
3. Submit your comment and rating.

## License
This project is licensed under the MIT License.

## Author
Developed by **Rohan More**.
