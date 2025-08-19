import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/layout/navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/pages/Home";
import Register from "./components/Login/Register";
import Login from "./components/Login/Login";
import BookList from "./components/Books/BookList";
import MyBorrowings from "./components/Borrow/MyBorrowings";
import AdminNavbar from "./Admin/components/nabar/AdminNavbar";

import Admin from "./Admin/AdminRoutes/Admin";
import CreateBook from "./Admin/components/Books/CreateBook";
import UpdateBook from "./Admin/components/Books/UpdateBook";
import DeleteBook from "./Admin/components/Books/DeleteBook";
import MostBorrowedBooks from "./Admin/components/Reports/MostBorrowedBooks";
import MostActiveMembers from "./Admin/components/Reports/MostActiveUsers";
import BookAvailability from "./Admin/components/Reports/BookAvailability";
const App = () => {
  const location=useLocation()
    const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen font-[Inter]">
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}

      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/myborrows" element={<MyBorrowings />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/create" element={<CreateBook />} />
          <Route path="/admin/update" element={<UpdateBook/>}/>
          <Route path="/admin/delete" element={<DeleteBook/>}/>
          <Route path="/admin/most-borrowed-books" element={<MostBorrowedBooks/>}/>
          <Route path="/admin/most-active-users" element={<MostActiveMembers/>}/>
          <Route path="/admin/total-books" element={<BookAvailability/>}/>
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
