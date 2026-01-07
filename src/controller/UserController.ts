import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import UserModel from "../model/User";
import InformModel, { Inform } from "../model/Inform";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Validar si ya existe
    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Encriptar contraseña
    const hashed = await bcrypt.hash(password, 10);

    // Crear usuario en DB
    const user = new UserModel({ name, email, password: hashed, informes: [] });
    await user.save();

    res.status(201).json({
      message: "Usuario registrado",
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error("Error al registrar usuario:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// LOGIN
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Buscar usuario por email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // 2. Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // 3. Responder (aquí podrías generar un JWT si quieres)
    res.status(200).json({
      message: "Login exitoso",
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
