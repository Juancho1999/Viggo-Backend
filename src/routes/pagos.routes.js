import express  from 'express';
import { agregarPago, obtenerPagosPorMes, obtenerSociosHistoricos, deletePago} from "../controllers/pagos.controller.js";
import { verificarToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Endpoints reales (cuando usemos DB y token)
router.post("/", verificarToken, agregarPago);

// 👉 Obtener socios históricos (para el select en Agregar Pago)
router.get("/socios", verificarToken,obtenerSociosHistoricos);

//Reportes Mensuales
router.get("/:mes", verificarToken, obtenerPagosPorMes);

// Eliminar pago 
router.delete('/:id', verificarToken, deletePago);



// Endpoint de prueba
router.get('/test', (req, res) => {
  res.json({ message: "Ruta de pagos funcionando ✅" });
});


export default router;