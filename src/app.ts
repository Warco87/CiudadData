import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongo-config";

dotenv.config(); // carga las variables desde .env
const PORT = process.env.PORT || 3000;
connectDB(); // Conectar a la base de datos
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