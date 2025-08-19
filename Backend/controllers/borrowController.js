import { Borrow } from "../models/Borrow.js";
import { Book } from "../models/Book.js";
export const borrowBook = async (req, res) => {
  const { bookId } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book || book.available <= 0) {
      return res.json({ success: false, message: "Book unavailable" });
    }

    book.available -= 1;
    await book.save();

    const borrow = new Borrow({
      user: req.user._id,
      book: bookId,
      dueAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
    });
    await borrow.save();

    res.json({ success: true, message: "Book borrowed successfully", borrow });
  } catch (err) {
    res.json({ success: false, message: "Server error while borrowing book" });
  }
};

export const returnBook = async (req, res) => {
  const { borrowId } = req.body;

  try {
    const borrow = await Borrow.findById(borrowId).populate("book");
    if (!borrow || borrow.status === "returned") {
      return res.json({ success: false, message: "Invalid borrow record" });
    }

    borrow.status = "returned";
    borrow.returnedAt = new Date();
    await borrow.save();

    borrow.book.available += 1;
    await borrow.book.save();

    res.json({ success: true, message: "Book returned successfully", borrow });
  } catch (err) {
    res.json({ success: false, message: "Server error while returning book" });
  }
};

export const myBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find({ user: req.user._id }).populate("book");
    res.json({ success: true, borrows });
  } catch (err) {
    res.json({
      success: false,
      message: "Server error while fetching borrows",
    });
  }
};
