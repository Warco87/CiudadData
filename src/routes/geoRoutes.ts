import express from 'express';
import geoControllers from '../controllers/geoControllers.js';

const geoRouter = express.Router();

// Ruta para Población
geoRouter.get('/population/:country', geoControllers.getPopulation);

// Ruta para ver el historial de la DB
geoRouter.post('/report', geoControllers.saveReport);

//Ruta para ver datos geográficos
geoRouter.get('/city/:city', geoControllers.getCityInfo);

export default geoRouter;