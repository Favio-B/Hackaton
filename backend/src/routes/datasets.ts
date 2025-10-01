import { Router, Request, Response } from 'express';
import { generalRateLimit } from '../middleware/rateLimit';
import { createError } from '../middleware/errorHandler';
import { Dataset, CreateDatasetRequest } from '../types';

const router = Router();

// In-memory storage
const datasets: Dataset[] = [];

// Middleware to extract user ID from token (simplified)
const extractUserId = (req: Request): string => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError('No token provided', 401);
  }
  
  const token = authHeader.substring(7);
  // In a real app, verify and decode the JWT token
  // For now, extract user ID from dummy token format
  const parts = token.split('_');
  if (parts.length < 3) {
    throw createError('Invalid token', 401);
  }
  
  return parts[2]; // userId is the third part in dummy_token_userId_timestamp
};

// GET /datasets
router.get('/', generalRateLimit, (req: Request, res: Response) => {
  try {
    const userId = extractUserId(req);
    
    // Filter datasets by user
    const userDatasets = datasets.filter(dataset => dataset.userId === userId);
    
    res.json({
      datasets: userDatasets
    });
  } catch (error) {
    throw error;
  }
});

// POST /datasets
router.post('/', generalRateLimit, (req: Request, res: Response) => {
  try {
    const userId = extractUserId(req);
    const { name, description, tags }: CreateDatasetRequest = req.body;

    if (!name || !description) {
      throw createError('Name and description are required', 400);
    }

    if (typeof name !== 'string' || typeof description !== 'string') {
      throw createError('Name and description must be strings', 400);
    }

    if (!Array.isArray(tags)) {
      throw createError('Tags must be an array', 400);
    }

    const newDataset: Dataset = {
      id: Date.now().toString(),
      name,
      description,
      tags,
      createdAt: new Date(),
      userId
    };

    datasets.push(newDataset);

    res.status(201).json({
      message: 'Dataset created successfully',
      dataset: newDataset
    });
  } catch (error) {
    throw error;
  }
});

export default router;
