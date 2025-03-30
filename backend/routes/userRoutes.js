import express from 'express';
import passport from 'passport';
import { login, signup } from '../controllers/userController.js';

const router = express.Router();

// Register
router.post('/signup', signup);

// Login
router.post('/login', login);

// Protected Route
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ user: req.user });
});

export default router;
