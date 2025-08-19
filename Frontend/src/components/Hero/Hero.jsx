import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate=useNavigate()
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div className='mx-auto'>
       <div className='text-center m-18'>
        <h1 className='text-4xl font-bold font-serif'>Nalanda Library</h1>
          <p className='font-bold m-1 text-md text-blue-700'>Effortlessly manage books, members, and borrowing with a modern, intuitive platform.</p>
          <p className='text-md'>Join Now and Explore Wide Variety Of Books</p>
                      {token ? (
              <button
                onClick={handleLogout}
                className='bg-black cursor-pointer text-white px-6 py-2 m-2 rounded-md hover:bg-gray-800 transition duration-200'
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate('/register')}
                className='bg-black cursor-pointer text-white px-6 py-2 m-2 rounded-md hover:bg-gray-800 transition duration-200'
              >
                Sign Up
              </button>
            )}
       </div>
       
    </div>
  )
}

export default Hero
