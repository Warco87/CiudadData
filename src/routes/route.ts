import { Router } from "express";
import { registerUser, loginUser } from "../controller/UserController";
import { addInformeToUser, getAllInformes } from "../controller/InformController";
// Importamos los nuevos controladores
import { getGeo, getTransit } from "../controller/ApiController";

const router = Router();

// Rutas existentes
router.post("/api/register", registerUser);   //registrar
router.post("/api/login", loginUser);     //loguearse
router.post("/api/addinformes", addInformeToUser);   //agregarinformes
router.get("/api/informes", getAllInformes);    //visualizar informes

// rutas para las apis
router.get("/api/geo/:city", getGeo);    
router.get("/api/transit/:stopId", getTransit);

export default router;