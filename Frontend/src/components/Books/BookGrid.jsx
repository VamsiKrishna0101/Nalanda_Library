import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
const PAGE_SIZE = 12;

const sortingOptions = [
  { value: 'title-asc', label: 'Title: A-Z' },
  { value: 'title-desc', label: 'Title: Z-A' },
];

function sortBooks(books, sort) {
  const sorted = [...books];
  switch (sort) {
    case 'title-asc':
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'title-desc':
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      break;
    default:
      break;
  }
  return sorted;
}

const BookGrid = ({ books }) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('title-asc');
  const [currentPage, setCurrentPage] = useState(1);

const handleborrow=async(id)=>{
    try {
    const token = localStorage.getItem("token"); 
    const { data } = await axios.post(
      "http://localhost:5000/api/borrow/borrow",
      { bookId: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );


    if (data.success) {
      toast.success("Book borrowed successfully!");
    } else {
      toast.error(data.message || "Failed to borrow the book.");
    }

    } catch (error) {
        if(error.response.status===401)
        toast.error('Please Login to Borrow This Book')
        else
        toast.error('server error')
    }
  }

  const filteredBooks = books.filter(book => {
    const q = search.toLowerCase();
    return (
      book.title.toLowerCase().includes(q) ||
      book.author?.toLowerCase().includes(q) ||
      (Array.isArray(book.tags) && book.tags.some(tag => tag.toLowerCase().includes(q)))
    );
  });

  const sortedBooks = sortBooks(filteredBooks, sort);

  const totalPages = Math.ceil(sortedBooks.length / PAGE_SIZE);
  const pageBooks = sortedBooks.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => setCurrentPage(1), [search, sort, books.length]);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md w-full md:w-1/3 focus:outline-none"
        />
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          {sortingOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {pageBooks.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-lg py-20">
            No books found.
          </div>
        ) : (
          pageBooks.map(book => (
            <div key={book._id} className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
              <img
                src={book.coverImage || '/no-cover.png'}
                alt={book.title}
                className="h-32 w-24 object-cover mb-4 rounded"
              />
              <h3 className="font-bold text-lg mb-1 text-center">{book.title}</h3>
              <p className="text-gray-600 text-sm mb-1">{book.author}</p>
              <p className="text-sm text-gray-700 mb-2">
                Available Copies: <span className="font-semibold">{book.available}</span>
              </p>

              <div className="flex flex-wrap gap-1 mb-3">
                {book.tags && book.tags.map(tag => (
                  <span key={tag} className="bg-green-100 text-[11px] px-2 py-1 rounded">{tag}</span>
                ))}
              </div>

              <button
                disabled={book.available <= 0}
                className={`px-4 py-2 w-full rounded-lg text-white font-semibold transition 
                  ${book.available > 0
                    ? "bg-green-600 cursor-pointer hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed"}`}
               onClick={()=>(handleborrow(book._id))}>
                {book.available > 0 ? "Borrow" : "Not Available"}
              </button>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-3 mt-10">
          <button
            className="px-4 py-1 cursor-pointer rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="font-semibold">{currentPage} / {totalPages}</span>
          <button
            className="px-4 cursor-pointer py-1 rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BookGrid;
