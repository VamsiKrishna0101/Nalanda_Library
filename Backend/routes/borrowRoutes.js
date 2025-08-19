import express from "express";
import { borrowBook, returnBook, myBorrows } from "../controllers/borrowController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();
router.post("/borrow", authMiddleware, borrowBook);
router.post("/return", authMiddleware, returnBook);
router.get("/my", authMiddleware, myBorrows);

export default router;
