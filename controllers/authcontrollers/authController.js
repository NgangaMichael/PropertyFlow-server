// controllers/authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../../models/usersmodel/user.js';

export const login = async (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt for user:", req.body);

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) return res.status(401).json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid username or password" });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      maxAge: 3600000,
    });

    // ⬅️ Send permissions as JSON
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        username: user.username,
        designation: user.designation,
        permissions: user.permissions, // your stored permissions JSON column
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const logout = (req, res) => {
  // res.clearCookie('token');
  res.clearCookie('token', { path: '/', httpOnly: true, secure: true });
  res.status(200).json({ message: 'Logged out successfully' });
};

export const me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'email' , 'designation'], // Add other public fields
    });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch user' });
  }
};