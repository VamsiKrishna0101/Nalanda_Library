import BookGrid from './BookGrid';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/books');
        if (res.data.success) {
          setBooks(res.data.books); 
        } else {
          console.error(res.data.message);
        }
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <p className="p-8">Loading books...</p>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-8">Browse Books</h2>
      <BookGrid books={books} />
    </div>
  );
};

export default BookList;
