import express from "express";
import { createBook, listBooks, updateBook, deleteBook } from "../controllers/bookController.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", listBooks);
router.post("/addbook", authMiddleware, adminMiddleware, createBook);
router.put("/:id", authMiddleware, adminMiddleware, updateBook);
router.delete("/:id", authMiddleware, adminMiddleware, deleteBook);

export default router;
