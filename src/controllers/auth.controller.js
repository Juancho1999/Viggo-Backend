import { pool } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

console.log("JWT_SECRET:", process.env.JWT_SECRET);

// 👉 Login de administrador
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son requeridos" });
    }

    // 1. Buscar admin por email
    const [rows] = await pool.query("SELECT * FROM admin WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const admin = rows[0];

     //2. Comparar contraseñas
    const esValido = await bcrypt.compare(password, admin.password);
    if (!esValido) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // 3. Generar token JWT
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login exitoso", token });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error interno en el servidor" });
  }
};

