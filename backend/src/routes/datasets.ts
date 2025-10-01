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
    throw createError('No se proporcionó token', 401);
  }
  
  const token = authHeader.substring(7);
  // In a real app, verify and decode the JWT token
  // For now, extract user ID from dummy token format
  const parts = token.split('_');
  if (parts.length < 3) {
    throw createError('Token inválido', 401);
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
      throw createError('El nombre y la descripción son requeridos', 400);
    }

    if (typeof name !== 'string' || typeof description !== 'string') {
      throw createError('El nombre y la descripción deben ser texto', 400);
    }

    if (!Array.isArray(tags)) {
      throw createError('Las etiquetas deben ser un arreglo', 400);
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
      message: 'Dataset creado exitosamente',
      dataset: newDataset
    });
  } catch (error) {
    throw error;
  }
});

// GET /datasets/:id
router.get('/:id', generalRateLimit, (req: Request, res: Response) => {
  try {
    const userId = extractUserId(req);
    const datasetId = req.params.id;
    
    const dataset = datasets.find(d => d.id === datasetId && d.userId === userId);
    
    if (!dataset) {
      throw createError('Dataset no encontrado', 404);
    }
    
    res.json({ dataset });
  } catch (error) {
    throw error;
  }
});

// PUT /datasets/:id
router.put('/:id', generalRateLimit, (req: Request, res: Response) => {
  try {
    const userId = extractUserId(req);
    const datasetId = req.params.id;
    const { name, description, tags }: CreateDatasetRequest = req.body;

    if (!name || !description) {
      throw createError('El nombre y la descripción son requeridos', 400);
    }

    if (typeof name !== 'string' || typeof description !== 'string') {
      throw createError('El nombre y la descripción deben ser texto', 400);
    }

    if (!Array.isArray(tags)) {
      throw createError('Las etiquetas deben ser un arreglo', 400);
    }

    const datasetIndex = datasets.findIndex(d => d.id === datasetId && d.userId === userId);
    
    if (datasetIndex === -1) {
      throw createError('Dataset no encontrado', 404);
    }

    // Update dataset
    datasets[datasetIndex] = {
      ...datasets[datasetIndex],
      name,
      description,
      tags
    };

    res.json({
      message: 'Dataset actualizado exitosamente',
      dataset: datasets[datasetIndex]
    });
  } catch (error) {
    throw error;
  }
});

// DELETE /datasets/:id
router.delete('/:id', generalRateLimit, (req: Request, res: Response) => {
  try {
    const userId = extractUserId(req);
    const datasetId = req.params.id;
    
    const datasetIndex = datasets.findIndex(d => d.id === datasetId && d.userId === userId);
    
    if (datasetIndex === -1) {
      throw createError('Dataset no encontrado', 404);
    }

    const deletedDataset = datasets[datasetIndex];
    datasets.splice(datasetIndex, 1);

    res.json({
      message: 'Dataset eliminado exitosamente',
      dataset: deletedDataset
    });
  } catch (error) {
    throw error;
  }
});

// GET /datasets/debug - Solo para desarrollo
router.get('/debug', (req: Request, res: Response) => {
  res.json({
    totalDatasets: datasets.length,
    datasets: datasets.map(dataset => ({
      id: dataset.id,
      name: dataset.name,
      description: dataset.description,
      tags: dataset.tags,
      createdAt: dataset.createdAt,
      userId: dataset.userId
    }))
  });
});

export default router;
