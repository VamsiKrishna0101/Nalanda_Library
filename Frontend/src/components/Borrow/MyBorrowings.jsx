import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const API = "http://localhost:5000/api/borrow/my"; 

const MyBorrowings = () => {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first!");
      setLoading(false);
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    setLoading(true);
    fetch(API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setBorrows(data.borrows || data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch borrow records.");
        setLoading(false);
      });
  }, [navigate]);

  const handleReturn = async (borrowId) => {
    setReturningId(borrowId);

    const response = await fetch(`http://localhost:5000/api/borrow/return`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ borrowId }),
    });

    if (response.ok) {
      toast.success("Successfully returned!");
      setBorrows(borrows => borrows.map(b =>
        b._id === borrowId ? { ...b, status: "returned", returnedAt: new Date().toISOString() } : b
      ));
    } else {
      toast.error("Failed to return.");
    }

    setReturningId(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">My Borrowed Books</h2>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table className="w-full border rounded overflow-hidden text-sm shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-3">Title</th>
                <th className="py-2 px-3">Borrowed At</th>
                <th className="py-2 px-3">Due At</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {borrows.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-5 text-center text-gray-400">
                    No borrowed books found.
                  </td>
                </tr>
              )}
              {borrows.map(borrow => (
                <tr key={borrow._id} className="border-t">
                  <td className="py-2 px-3 font-medium">
                    {borrow.book?.title || '-'}
                  </td>
                  <td className="py-2 px-3">{new Date(borrow.borrowedAt).toLocaleDateString()}</td>
                  <td className="py-2 px-3">{new Date(borrow.dueAt).toLocaleDateString()}</td>
                  <td className="py-2 px-3">
                    {borrow.status === "returned"
                      ? <span className="text-green-600 font-semibold">Returned</span>
                      : <span className="text-yellow-600 font-semibold">Borrowed</span>}
                  </td>
                  <td className="py-2 px-3">
                    {borrow.status === "borrowed" && (
                      <button
                        disabled={returningId === borrow._id}
                        onClick={() => handleReturn(borrow._id)}
                        className={`px-4 py-1 rounded bg-[#00997a] cursor-pointer text-white font-semibold hover:bg-green-700 transition ${
                          returningId === borrow._id ? 'opacity-50 cursor-wait' : ''
                        }`}
                      >
                        {returningId === borrow._id ? 'Returning...' : 'Return'}
                      </button>
                    )}
                    {borrow.status === "returned" && (
                      <span className="text-xs text-gray-500">
                        {borrow.returnedAt
                          ? `on ${new Date(borrow.returnedAt).toLocaleDateString()}`
                          : ""}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default MyBorrowings;
