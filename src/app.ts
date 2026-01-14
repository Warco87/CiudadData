import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/mongo-config";
import router from "./routes/route";
import open from "open";
import cors from "cors";


dotenv.config(); // carga las variables desde .env
const PORT = process.env.PORT || 3000;
connectDB(); // Conectar a la base de datos
const app = express();

// Middleware para parsear JSON
app.use(express.json());
app.use(router);
app.use(cors());

app.use(express.static(path.join(__dirname, "view")));
// Ruta de prueba
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view/Inicio.html"));
});


// Puerto
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  open("http://localhost:3000");
});

export default app;