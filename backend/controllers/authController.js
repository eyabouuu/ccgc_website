import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate JWT
const generateToken = (user) => 
  jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1d' });

// Sign in
export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.json({ token: generateToken(user), user });
};

// Create Sub-Admin
export const createSubAdmin = async (req, res) => {
  const { email, password, pseudo } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already used' });

  const subAdmin = await User.create({ email, password, role: 'sub-admin', pseudo });
  res.status(201).json(subAdmin);
};

// Get All Sub-Admins
export const getAllSubAdmins = async (req, res) => {
  const subs = await User.find({ role: 'sub-admin' }).select('-password');
  res.json(subs);
};

// Update Sub-Admin
export const updateSubAdmin = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (updates.password) {
    const user = await User.findById(id);
    user.password = updates.password;
    await user.save();
    delete updates.password;
  }
  const updated = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
  res.json(updated);
};

// Delete Sub-Admin
export const deleteSubAdmin = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: 'Deleted successfully' });
};
