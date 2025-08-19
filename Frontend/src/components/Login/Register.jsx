import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error('All fields are required!');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message || 'Registration successful');
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        navigate('/');
      } else {
        toast.error(res.data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong during registration');
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
          <p className="text-sm font-bold">Please Fill in your Details to Register</p>
        </div>

        <form onSubmit={registerUser}>
          <div className="mb-4 mt-4 flex flex-col">
            <label className="block text-sm font-bold" htmlFor="name">Name</label>
            <input
              className="p-2 w-full rounded border"
              type="text"
              id="name"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label className="block text-sm font-bold" htmlFor="email">Email</label>
            <input
              className="p-2 w-full rounded border"
              type="email"
              id="email"
              placeholder="Enter Email"
              value={email}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full p-3 bg-black text-white rounded cursor-pointer" type="submit">
            Register
          </button>
        </form>

        <div className="flex mt-3 space-x-1 justify-center">
          <p className="text-sm font-bold">Already Registered?</p>
          <Link to="/login" className="text-blue-500 text-sm font-bold ml-1">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
