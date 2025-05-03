import express from "express";
const router = express.Router();
import { signIn, createSubAdmin, getAllSubAdmins, updateSubAdmin, deleteSubAdmin } from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/auth.js';
import { isAdmin } from '../middleware/auth.js';
router.post('/signin', signIn);
router.post('/sub-admins', isAuthenticated, isAdmin, createSubAdmin);
router.get('/sub-admins', isAuthenticated, isAdmin, getAllSubAdmins);
router.put('/sub-admins/:id', isAuthenticated, isAdmin, updateSubAdmin);
router.delete('/sub-admins/:id', isAuthenticated, isAdmin, deleteSubAdmin);

export default router;