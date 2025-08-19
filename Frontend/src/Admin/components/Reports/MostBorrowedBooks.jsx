import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MostBorrowedBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token=localStorage.getItem("token")
        const { data } = await axios.get("http://localhost:5000/api/report/most-borrowed-books",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        setBooks(data.books || []);
      } catch (err) {
        toast.error("Failed to fetch most borrowed books");
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">📚 Most Borrowed Books</h2>
      <table className="w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Author</th>
            <th className="p-2 border">Borrow Count</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, i) => (
            <tr key={i} className="text-center">
              <td className="p-2 border">{book.title}</td>
              <td className="p-2 border">{book.author}</td>
              <td className="p-2 border font-semibold">{book.borrowCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MostBorrowedBooks;
