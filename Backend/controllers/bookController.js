import { Book } from "../models/Book.js";
export const createBook = async (req, res) => {
  const { title, author, isbn, copies, tags } = req.body;

  try {
    const exists = await Book.findOne({ isbn });
    if (exists) {
      return res.json({ success: false, message: "Book already exists" });
    }
    const newBook = new Book({ title, author, isbn, copies, available: copies, tags });
    const book = await newBook.save();
    res.json({ success: true, message: "Book created successfully", book });
  } catch (err) {
    res.json({ success: false, message: "Server error while creating book" });
  }
};

export const listBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json({ success: true, books });
  } catch (err) {
    res.json({ success: false, message: "Server error while fetching books" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.json({ success: false, message: "Book not found" });
    res.json({ success: true, message: "Book updated successfully", book });
  } catch (err) {
    res.json({ success: false, message: "Server error while updating book" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.json({ success: false, message: "Book not found" });
    res.json({ success: true, message: "Book deleted successfully" });
  } catch (err) {
    res.json({ success: false, message: "Server error while deleting book" });
  }
};
