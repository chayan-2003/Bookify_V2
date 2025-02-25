import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' ? 'https://bookify-v2-2.onrender.com' : 'http://localhost:8080';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  // Fetch profile data on mount
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setIsLoggedIn(false);
      return;
    }
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/profile`, {
          headers: { Authorization: token },
        });
        setIsLoggedIn(true);
        setProfileData(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, token]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  // Loading spinner while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <FaSpinner className="animate-spin text-indigo-600 text-2xl" />
      </div>
    );
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-sm font-extrabold tracking-wide">
            <span className="text-white">BOOKIFY</span>
            <span className="text-yellow-300">v2</span>
          </div>
        </Link>

        {/* Navigation Section */}
        <div className="flex items-center space-x-6">
          <div className="space-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg font-semibold bg-white text-indigo-500 hover:bg-indigo-100 transition duration-200 ease-in-out"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg font-semibold bg-white text-indigo-500 hover:bg-indigo-100 transition duration-200 ease-in-out"
                >
                  Login
                </Link>
              </>
            ) : (
              // Profile Section if logged in
              <div className="relative flex items-center space-x-4">
                {profileData?.img ? (
                  <img
                    src={profileData.img}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover cursor-pointer hover:opacity-80"
                  />
                ) : (
                  <FaUserCircle className="text-3xl cursor-pointer hover:text-yellow-400" />
                )}
                <div className="ml-2 text-sm">
                  <Link to="/profile" className="hover:underline">
                    Welcome, {profileData?.username}
                  </Link>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600 transition duration-200 ease-in-out"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;