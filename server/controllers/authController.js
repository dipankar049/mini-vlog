const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({ msg: "All fields required" });
    }

    if (password.trim().length < 4) {
      return res.status(400).json({ msg: "Password must be at least 4 characters" });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name,
        email,
      },
      msg: "Register successfull"
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ msg: "All fields required" });
    }

    if (password.trim().length < 4) {
      return res.status(400).json({ msg: "Password must be at least 4 characters" });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      msg: "Login successfull"
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  register,
  login,
};