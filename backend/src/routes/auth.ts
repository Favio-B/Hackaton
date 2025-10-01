import { Router, Request, Response } from 'express';
import { authRateLimit } from '../middleware/rateLimit';
import { createError } from '../middleware/errorHandler';
import { User, AuthRequest } from '../types';

const router = Router();

// In-memory storage
const users: User[] = [];

// Dummy token generator
const generateToken = (userId: string): string => {
  return `dummy_token_${userId}_${Date.now()}`;
};

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// POST /auth/register
router.post('/register', authRateLimit, (req: Request, res: Response) => {
  try {
    const { email, password }: AuthRequest = req.body;

    if (!email || !password) {
      throw createError('Email and password are required', 400);
    }

    if (!isValidEmail(email)) {
      throw createError('Invalid email format', 400);
    }

    if (password.length < 6) {
      throw createError('Password must be at least 6 characters', 400);
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      throw createError('User already exists', 409);
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      password // In real app, hash this password
    };

    users.push(newUser);

    const token = generateToken(newUser.id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: newUser.id, email: newUser.email }
    });
  } catch (error) {
    throw error;
  }
});

// POST /auth/login
router.post('/login', authRateLimit, (req: Request, res: Response) => {
  try {
    const { email, password }: AuthRequest = req.body;

    if (!email || !password) {
      throw createError('Email and password are required', 400);
    }

    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw createError('Invalid credentials', 401);
    }

    const token = generateToken(user.id);

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    throw error;
  }
});

export default router;
