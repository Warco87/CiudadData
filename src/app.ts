import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // carga las variables desde .env
const PORT = process.env.PORT || 3000;


mongoose.connect("mongodb://localhost:27017/ciudad-data")
  .then(() => console.log("Conectado a MongoDB local"))
  .catch(err => console.error("Error de conexión:", err));

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "¡Hola Marco! Tu API con TypeScript y Express está funcionando 🚀" });
});

// Puerto
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;