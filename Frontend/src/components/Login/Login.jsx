import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Email || !Password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email: Email,
        password: Password,
      });

      if (response.data.success) {
        toast.success(response.data.message || 'Login successful');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        if(response.data.role==='admin')
        navigate('/admin');
        else
            navigate('/') 
      } else {
        toast.error(response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong during login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-10 rounded-lg border shadow-sm">
        <div className="flex justify-center">
          <h1 className="text-2xl font-medium">Nalanda Library</h1>
        </div>
        <div className="flex justify-center mt-4">
          <h2 className="text-2xl font-bold">Hey There!👋</h2>
        </div>
        <div className="flex justify-center mt-3">
          <p className="text-sm font-bold">Enter your email and password to login</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4 flex flex-col">
            <label className="block text-sm font-bold" htmlFor="email">Email</label>
            <input
              className="p-2 w-full rounded border"
              type="email"
              id="email"
              placeholder="Enter Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label className="block text-sm font-bold" htmlFor="password">Password</label>
            <input
              className="p-2 w-full rounded border"
              type="password"
              id="password"
              placeholder="Enter Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-black text-white cursor-pointer rounded hover:bg-gray-800 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="flex mt-4 space-x-1 justify-center">
          <p className="text-sm font-bold">Don't have an account?</p>
          <Link to="/register" className="text-blue-500 text-sm font-bold ml-1">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
