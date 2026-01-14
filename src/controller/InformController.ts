import { Request, Response } from "express";
import UserModel from "../model/User";
import InformModel, { Inform } from "../model/Inform";
// AGREGAR INFORME A USUARIO Y A LA COLECCIÓN DE INFORMES
export const addInformeToUser = async (req: Request, res: Response) => {
  try {
    // Ahora tomamos el email desde req.params
    console.log("ya entro al back");
    const { title, description, email } = req.body;

    // 1. Crear informe en la colección de informes
    const informe = new InformModel({ title, description, email });
    console.log("creo informe");
    await informe.save();

    // 2. Buscar usuario por email y agregar referencia
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Inicializar array si no existe
    if (!user.informes) {
      user.informes = [];
    }

    user.informes.push(informe._id);
    console.log("metio informes");
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
    console.log(informes);
    res.status(200).json({informes});
  } catch (err) {
    console.error("Error al obtener informes:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


