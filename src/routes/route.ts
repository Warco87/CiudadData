import { Router } from "express";
import { registerUser, loginUser} from "../controller/UserController";
import {addInformeToUser, getAllInformes } from "../controller/InformController";

const router = Router();

router.post("/register", registerUser);          // Registro
router.post("/login", loginUser);                // Login
router.post("/addinformes", addInformeToUser); // Agregar informe
router.get("/informes", getAllInformes);         // Ver todos los informes

export default router;