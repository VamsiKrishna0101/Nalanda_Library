import React from 'react'

const Join = () => {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div className='mx-auto bg-black text-white h-60 flex mt-10 items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-2xl font-semibold'>Millions Of Users Are Using Our Website</h1>
        <h1 className='text-2xl font-semibold mb-4'>Explore Now</h1>

                    {token ? (
              <button
                onClick={handleLogout}
          className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white px-6 py-2 cursor-pointer rounded-full font-semibold tracking-wide shadow-lg hover:brightness-110 transition duration-200 ease-in-out"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate('/register')}
          className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white px-6 py-2 cursor-pointer rounded-full font-semibold tracking-wide shadow-lg hover:brightness-110 transition duration-200 ease-in-out"
              >
                Sign Up
              </button>
            )}
      </div>
    </div>
  )
}

export default Join
