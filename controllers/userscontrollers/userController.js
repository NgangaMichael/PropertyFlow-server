import { userService } from '../../services/index.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsersService();
  res.json(users);
};

export const createUser = async (req, res) => {
  const { username, email, designation, phone, password } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await userService.createUserService({
      username,
      email,
      designation,
      phone,
      password: hashedPassword
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, designation, phone } = req.body;

  try {
    const updatedUser = await userService.updateUserService(id, {
      username,
      email,
      designation,
      phone,
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userService.deleteUserService(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};