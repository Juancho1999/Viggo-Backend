import express from 'express';
import { login } from '../controllers/auth.controller.js';

const router = express.Router();

// Endpoint real (cuando conectemos DB)
router.post('/login', login);

// Endpoint de prueba
router.get('/test', (req, res) => {
  res.json({ message: "Ruta de auth funcionando ✅" });
});

export default router;
