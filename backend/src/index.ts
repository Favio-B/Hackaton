import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import { generalRateLimit } from './middleware/rateLimit';
import authRoutes from './routes/auth';
import datasetRoutes from './routes/datasets';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(generalRateLimit);

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/auth', authRoutes);
app.use('/datasets', datasetRoutes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: {
      message: 'Ruta no encontrada',
      status: 404
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
