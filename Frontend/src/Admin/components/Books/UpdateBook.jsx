import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const UpdateBook = () => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    author: "",
    genre: "",
    availableCopies: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

  e.preventDefault();
  if (!formData.id) {
    toast.error("Book ID is required!");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const updatedData = {};
    if (formData.title.trim() !== "") updatedData.title = formData.title;
    if (formData.author.trim() !== "") updatedData.author = formData.author;
    if (formData.genre.trim() !== "") updatedData.genre = formData.genre;
    if (formData.availableCopies !== "")
      updatedData.availableCopies = formData.availableCopies;

    const res = await axios.put(
      `http://localhost:5000/api/books/${formData.id}`,
      updatedData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.success) {
      toast.success(res.data.message);
      setFormData({
        id: "",
        title: "",
        author: "",
        genre: "",
        availableCopies: "",
      });
    } else {
      toast.error(res.data.message);
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to update book");
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Update Book
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Book ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="Enter Book ID"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter new title"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter new author"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Enter new genre"
              className="w-full p-2 border rounded"
            />
          </div>

        
          <div>
            <label className="block font-medium">Available Copies</label>
            <input
              type="number"
              name="availableCopies"
              value={formData.availableCopies}
              onChange={handleChange}
              placeholder="Enter available copies"
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
