import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

export function generateJWT(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}
