import express from "express";
import { getMonto, updateMonto } from "../controllers/config.controller.js";
import { verificarToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// 👉 Obtener monto fijo (requiere login)
router.get("/", verificarToken, getMonto);

// 👉 Actualizar monto fijo (requiere login)
router.put("/", verificarToken, updateMonto);

export default router;