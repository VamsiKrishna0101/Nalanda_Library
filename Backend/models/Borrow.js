import mongoose from "mongoose";
const borrowSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    borrowedAt: { type: Date, default: Date.now },
    dueAt: { type: Date, required: true },
    returnedAt: { type: Date },
    status: { type: String, enum: ["borrowed", "returned"], default: "borrowed" }
  },
  { timestamps: true }
);
export const Borrow = mongoose.model("Borrow", borrowSchema);
