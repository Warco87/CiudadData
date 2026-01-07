import { Request, Response } from "express";
import UserModel from "../model/User";
import InformModel, { Inform } from "../model/Inform";
// AGREGAR INFORME A USUARIO Y A LA COLECCIÓN DE INFORMES
export const addInformeToUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { title, description } = req.body;

    // 1. Crear informe en la colección de informes
    const informe: Inform = new InformModel({ title, description });
    await informe.save();

    // 2. Buscar usuario y agregar referencia
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    user.informes.push(informe._id);
    await user.save();

    res.status(200).json({
      message: "Informe agregado al usuario y guardado en la colección de informes",
      user,
      informe
    });
  } catch (err) {
    console.error("Error al agregar informe:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// VER TODOS LOS INFORMES (colección independiente)
export const getAllInformes = async (req: Request, res: Response) => {
  try {
    const informes = await InformModel.find();

    res.status(200).json({
      message: "Lista de informes",
      informes
    });
  } catch (err) {
    console.error("Error al obtener informes:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


