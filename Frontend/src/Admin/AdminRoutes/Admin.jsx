import { Routes, Route, useNavigate } from "react-router-dom";
import CreateBook from "../components/Books/CreateBook";
import UpdateBook from "../components/Books/UpdateBook";
import DeleteBook from "../components/Books/DeleteBook";
import MostBorrowedBooks from "../components/Reports/MostBorrowedBooks";
import MostActiveMembers from "../components/Reports/MostActiveUsers";
import BookAvailability from "../components/Reports/BookAvailability";
function Admin() {
  const navigate = useNavigate();

  const buttons = [
    { label: "Create Book", route: "create" },
    { label: "Update Book", route: "update" },
    { label: "Delete Book", route: "delete" },
    { label: "Most Borrowed Book", route: "most-borrowed-books" },
    { label: "Most Active Users", route: "most-active-users" },
    { label: "Total Books", route: "total-books" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">📚 Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => navigate(btn.route)}
            className="w-full p-4 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-2xl shadow-lg hover:scale-105 hover:from-purple-700 hover:to-blue-600 transition-all"
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="bg-gray-50 p-6 rounded-xl shadow-md">
        <Routes>
          <Route path="create" element={<CreateBook />} />
          <Route path="update" element={<UpdateBook/>}/>
          <Route path="delete" element={<DeleteBook/>}/>
          <Route path="most-borrowed-books" element={<MostBorrowedBooks/>}/>
          <Route path="most-active-users" element={<MostActiveMembers/>}/>
          <Route path="total-books" element={<BookAvailability/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
