import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FaUserCircle} from 'react-icons/fa'
const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("campaignId");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white z-50 shadow-md py-2 px-6 flex items-center justify-between">
        <div className="text-xl font-bold text-[#10b981]">
          <span className="text-black">Nalanda</span>
          <span className="text-[#10b981]">Library</span>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/"
            className="text-gray-700 font-medium hover:text-black text-sm"
          >
            Home
          </Link>
          <Link
            to="/books"
            className="text-gray-700 font-medium hover:text-black text-sm"
          >
            Books
          </Link>
          <Link
            to="/books"
            className="text-gray-700 font-medium hover:text-black text-sm"
          >
            Borrow
          </Link>
          <Link
            to="/myborrows"
            className="text-gray-700 font-medium hover:text-black text-sm"
          >
            My Borrowings
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <Link to="/profile"></Link>

          {!isLoggedIn ? (
            <>
              <button
                className="bg-black text-white px-6 py-2 rounded-full cursor-pointer font-semibold tracking-wide shadow-md hover:bg-gray-900 transition duration-200 ease-in-out"
                onClick={() => navigate("/register")}
              >
                Signup
              </button>
              <button
                className="bg-black text-white px-6 py-2 rounded-full cursor-pointer font-semibold tracking-wide shadow-md hover:bg-gray-900 transition duration-200 ease-in-out"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </>
          ) : (
            <button
              className="bg-red-500 cursor-pointer text-white px-6 py-2 rounded-full font-semibold tracking-wide shadow-md hover:bg-red-600 transition duration-200 ease-in-out"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
          {isLoggedIn && (
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-full cursor-pointer font-semibold tracking-wide shadow-md hover:bg-blue-700 transition duration-200"
              onClick={() => navigate("/profile")}
            >
              <FaUserCircle />
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
