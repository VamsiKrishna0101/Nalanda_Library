import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    copies: 1,
    tags: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bookData = {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        copies: Number(formData.copies),
        available: Number(formData.copies),
      };

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first!");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/books/addbook",
        bookData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", res.data);

      if (res.data.success) {
        toast.success("Book created successfully!");
        setFormData({ title: "", author: "", isbn: "", copies: 1, tags: "" });
      } else {
        toast.error(res.data.message || "Failed to create book");
      }
    } catch (error) {
      console.error("Error creating book:", error.response?.data || error);

      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized! Please login again.");
      } else {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Book</h2>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Book Title"
          required
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          required
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          placeholder="ISBN"
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="number"
          name="copies"
          value={formData.copies}
          onChange={handleChange}
          min="1"
          placeholder="Number of Copies"
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="w-full p-2 border rounded mb-3"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Book
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
