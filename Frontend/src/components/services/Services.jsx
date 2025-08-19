import React from 'react';
import libray from '../../assets/library.jpg';

const services = [
  {
    text: "Register easily and access a wide range of books from the comfort of your home.",
    bg: "bg-[#00997a]/90",
  },
  {
    text: "Personalize your experience and track all your current and past borrowings.",
    bg: "bg-[#ff9900]/90",
  },
  {
    text: "Stay informed about the most popular books and see real-time availability across the library.",
    bg: "bg-[#1aff1a]/90",
  },
];

const Services = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      <img
        src={libray}
        alt="Library Background"
        className="absolute inset-0 w-full h-full object-cover blur-[1px] brightness-90"
        style={{ zIndex: 0 }}
      />

      <div className="relative z-10 w-full flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full max-w-5xl px-4">
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col justify-center items-center text-justify p-6 h-80 rounded-3xl shadow-md ${service.bg} backdrop-blur-md`}
              style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.16)" }}
            >
              <p className="text-gray-800 font-medium">{service.text}</p>
              <button
                className="mt-8 px-6 py-2 rounded-full font-semibold tracking-wide shadow-md transition bg-black text-white hover:bg-gray-900 duration-200 ease-in-out"
                aria-label="signup"
              >
                Explore Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
