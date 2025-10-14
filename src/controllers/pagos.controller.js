// src/controllers/pagos.controller.js
import {pool } from "../config/db.js";

// 👉 Agregar un nuevo pago
export const agregarPago = async (req, res) => {
  try {
    const { nombre, alias, mes } = req.body;

    // Validación básica
    if (!nombre || !mes) {
      return res.status(400).json({ message: "Faltan datos obligatorios (nombre, mes)" });
    }

    // 1. Traemos el monto fijo de la configuración
    const [configRows] = await pool.query("SELECT monto_cuota FROM configuracion LIMIT 1");
    if (configRows.length === 0) {
      return res.status(500).json({ message: "No hay monto configurado en la base de datos" });
    }
    const monto = configRows[0].monto_cuota;

    // 2. Insertamos el pago
    const [result] = await pool.query(
      "INSERT INTO pagos (nombre, alias, mes, monto) VALUES (?, ?, ?, ?)",
      [nombre, alias || null, mes, monto]
    );

    res.status(201).json({
      message: "Pago registrado con éxito",
      pago: { id: result.insertId, nombre, alias, mes, monto },
    });
  } catch (error) {
    console.error("Error en agregarPago:", error);
    res.status(500).json({ message: "Error al registrar el pago" });
  }
};

// 👉 Obtener pagos por mes
export const obtenerPagosPorMes = async (req, res) => {
  try {
    const { mes } = req.params;
    console.log("Verificando token en obtenerPagosPorMes", mes);

    // 1. Traemos todos los pagos de ese mes
    const [rows] = await pool.query("SELECT * FROM pagos WHERE mes = ?", [mes]);

    // 2. Calcular totales
    const totalRecaudado = rows.reduce((acc, pago) => acc + parseFloat(pago.monto), 0);
    const cantidad = rows.length;

    res.json({
      mes,
      cantidad,
      totalRecaudado,
      pagos: rows,
    });
  } catch (error) {
    console.error("Error en obtenerPagosPorMes:", error);
    res.status(500).json({ message: "Error al obtener los pagos" });
  }
};

// 🔹 Obtener lista de nombres de socios únicos
// 🔹 Obtener lista de nombres de socios únicos (nombre + alias)
// 🔹 Obtener lista de nombres de socios únicos (nombre + alias)
export const obtenerSociosHistoricos = async (req, res) => {
  try {
    // ✅ Usamos pool, no db
    const [rows] = await pool.query(
      `SELECT DISTINCT nombre, alias 
       FROM pagos 
       WHERE nombre IS NOT NULL 
       ORDER BY nombre ASC`
    );

    // En caso de no haber datos, devolvemos array vacío
    if (!rows || rows.length === 0) {
      return res.json([]);
    }

    // ✅ Normalizamos los datos para evitar nulls
    const socios = rows.map((r) => ({
      nombre: r.nombre,
      alias: r.alias || "",
    }));

    res.json(socios);
  } catch (error) {
    console.error("Error al obtener nombres y alias:", error);
    res.status(500).json({ message: "Error al obtener nombres y alias" });
  }
};


// ✅ Eliminar un pago
export const deletePago = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM pagos WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Pago no encontrado' });
    }

    res.json({ message: 'Pago eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar pago:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};





