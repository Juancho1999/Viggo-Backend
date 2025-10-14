import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import configRoutes from "./routes/config.routes.js";
import pagosRoutes from "./routes/pagos.routes.js";
import { pool } from "./config/db.js";

// ✅ Configuración de CORS
const allowedOrigins = [
  "http://localhost:5173",         // React local
  "https://viggo-gym.netlify.app"  // Frontend en Netlify
];

const app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS no permitido"));
    },
    credentials: true,
  })
);

app.use(express.json());

// Rutas principales
app.use("/api/auth", authRoutes);
app.use("/api/configuracion", configRoutes);
app.use("/api/pagos", pagosRoutes);

// Endpoint raíz para testear server
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

(async () => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("Conexión a MySQL OK ✅", rows[0].result);
  } catch (error) {
    console.error("Error al conectar a MySQL ❌", error);
  }
})();
