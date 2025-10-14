import { pool } from "../config/db.js";

// Obtener monto fijo
export async function getMonto(req, res) {
  try {
    const [rows] = await pool.query("SELECT monto_cuota FROM configuracion LIMIT 1");
    res.json(rows[0]); // { monto_cuota: ... }
  } catch (err) {
    res.status(500).json({ error: "Error al obtener monto" });
  }
}

// Actualizar monto fijo
export async function updateMonto(req, res) {
  const { monto_cuota } = req.body;
  try {
    await pool.query("UPDATE configuracion SET monto_cuota = ? WHERE id = 1", [monto_cuota]);
    res.json({ message: "Monto actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar monto" });
  }
}
