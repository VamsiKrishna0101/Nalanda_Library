import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuInstagram } from "react-icons/lu";
import { FaMeta } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { MdOutlineLocalPhone } from "react-icons/md";

const Footer = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <footer className="bg-[#00997a] border-t py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4 text-center md:text-left">
        
        {/* Branding and Call to Action */}
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-2xl text-white mb-4 font-bold font-serif">Nalanda Library System</h1>
          <p className="text-sm text-gray-100 mb-4 max-w-xs">Your gateway to knowledge and reading.</p>
          <p className="font-medium text-sm mb-4 text-gray-200">Join us today and start borrowing your favorite books.</p>
          
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-black cursor-pointer text-white px-6 py-2 rounded-md hover:bg-gray-800 transition duration-200"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate('/register')}
              className="bg-black cursor-pointer text-white px-6 py-2 rounded-md hover:bg-gray-800 transition duration-200"
            >
              Sign Up
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center md:items-start">
          <h1 className="font-bold text-xl mb-3 text-white">Explore</h1>
          <div className="flex flex-col space-y-2 font-serif">
            <Link className="text-gray-100 hover:text-white" to="/">Home</Link>
            <Link className="text-gray-100 hover:text-white" to="/books">Books</Link>
            <Link className="text-gray-100 hover:text-white" to="/borrow">Borrow</Link>
            <Link className="text-gray-100 hover:text-white" to="/history">Borrow History</Link>
          </div>
        </div>

        {/* Social & Contact */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-xl mb-4 text-white">Follow Us</h3>
          <div className="flex space-x-4 mb-6">
            <FaMeta className="text-xl hover:text-blue-600 cursor-pointer text-white" />
            <LuInstagram className="text-xl hover:text-pink-500 cursor-pointer text-white" />
            <BsTwitterX className="text-xl hover:text-blue-400 cursor-pointer text-white" />
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-gray-200 text-sm mb-1">Call Us</h3>
            <div className="flex items-center space-x-2">
              <MdOutlineLocalPhone className="h-5 w-5 text-gray-300" />
              <p className="text-sm text-gray-300">+91 9876543210</p>
            </div>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-300 mt-10 pt-4">
        <p className="text-gray-300 text-sm text-center">&copy; 2025 Nalanda Library Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
