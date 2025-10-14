// Importamos mysql2 con soporte para promesas
import mysql from "mysql2/promise";

import dotenv from "dotenv";

dotenv.config();


// Creamos un "pool" de conexiones a MySQL
// Esto nos permite reutilizar conexiones en vez de abrir una nueva en cada query
export const pool = mysql.createPool({
  host: "localhost",     // Servidor MySQL (normalmente localhost)
  user: "root",          // Usuario de MySQL (ajustar si usás otro)
  password: "",          // Contraseña (cambiar si configuraste una en Workbench)
  database: "gimnasio",  // ⚠️ Tiene que coincidir con el nombre que creaste en Workbench
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});



