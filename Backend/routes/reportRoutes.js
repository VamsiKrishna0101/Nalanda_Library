import express from 'express';
import {
  mostBorrowedBooks,
  activeMembers,
  bookAvailability
} from '../controllers/reportController.js';
import { authMiddleware, adminMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.get('/most-borrowed-books', authMiddleware,adminMiddleware, mostBorrowedBooks);
router.get('/active-members', authMiddleware,adminMiddleware, activeMembers);
router.get('/book-availability', authMiddleware,adminMiddleware, bookAvailability);

export default router;
