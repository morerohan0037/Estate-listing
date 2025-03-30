import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AllListings from './pages/AllListings';
import AddListings from './pages/AddListings';
import Elementdetail from './pages/Elementdetail';
import Signup from './pages/Signup';
import Login from './pages/Login';
import EditElement from './pages/EditElement';
import ErrorPage from './pages/Error';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<AllListings />} />
          <Route path="/listings/:id" element={<Elementdetail />} />

          {/* Protected Routes (Require Authentication) */}
          <Route element={<PrivateRoute />}>
            <Route path="/listings/:id/edit" element={<EditElement />} />
            <Route path="/add-listing" element={<AddListings />} />
          </Route>

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Error Route */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
