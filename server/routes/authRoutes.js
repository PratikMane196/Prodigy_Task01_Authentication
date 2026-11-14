import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Dashboard route test
router.get('/dashboard', protect, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the secure dashboard!",
        user: req.user
    });
});

export default router;