import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { User } from "../models/User.js";
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};


export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = createToken(user._id);
    const role = user.role || "user";

    return res.json({
      success: true,
      message: "Registration successful",
      token,
      role,
    });
  } catch (error) {
    console.error(error);
res.json({ success: false, message: "Server error during registration", error });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const token = createToken(user._id);
    const role = user.role || "user";
    return res.json({
      success: true,
      message: "Login successful",
      token,
      role,
    });
  } catch (error) {
    res.json({ success: false, message: "Server error during login" });
  }
};
