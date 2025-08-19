import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BookAvailability = () => {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token=localStorage.getItem("token")
        const { data } = await axios.get("http://localhost:5000/api/report/book-availability",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        setStats(data);
      } catch (err) {
        toast.error("Failed to fetch book availability stats");
      }
    };
    fetchStats();
  }, []);

  if (!stats) return null;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">📊 Book Availability</h2>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-lg font-semibold">Total Books</p>
          <p className="text-xl">{stats.totalBooks}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-lg font-semibold">Total Copies</p>
          <p className="text-xl">{stats.totalCopies}</p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg">
          <p className="text-lg font-semibold">Borrowed Books</p>
          <p className="text-xl">{stats.borrowedBooks}</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <p className="text-lg font-semibold">Available Books</p>
          <p className="text-xl">{stats.availableBooks}</p>
        </div>
      </div>
    </div>
  );
};

export default BookAvailability;
