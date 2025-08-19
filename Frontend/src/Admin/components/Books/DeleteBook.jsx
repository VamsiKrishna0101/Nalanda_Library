import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const DeleteBook = () => {
  const [bookId, setBookId] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!bookId.trim()) {
      toast.error("Book ID is required");
      return;
    }

    try {
        const token=localStorage.getItem("token")
      const { data } = await axios.delete(`http://localhost:5000/api/books/${bookId}`
        ,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (data.success) {
        toast.success(data.message || "Book deleted successfully");
        setBookId(""); 
      } else {
        toast.error(data.message || "Failed to delete book");
      }
    } catch (err) {
      toast.error("Server error while deleting book");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Delete Book</h2>
      <form onSubmit={handleDelete} className="space-y-4">
        <input
          type="text"
          placeholder="Enter Book ID"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 cursor-pointer rounded-lg transition duration-200"
        >
          Delete Book
        </button>
      </form>
    </div>
  );
};

export default DeleteBook;
