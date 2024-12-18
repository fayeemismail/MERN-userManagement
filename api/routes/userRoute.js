import express from 'express';
import { deleteUser, test, updateUser } from '../controllers/userController.js';
import { uploadPhoto } from '../controllers/userController.js';
import multer from 'multer';
import { verifyToken } from '../utils/verifyUser.js';

const upload = multer({ dest: "uploads/" });
const router = express.Router();


router.get('/:id', test)
router.post('/update/:id', upload.single('profilePicture'), verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser)

export default router;