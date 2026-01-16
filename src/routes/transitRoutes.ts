import express from 'express';
import transitController from '../controllers/transitController.js';
import { transitValidateReport } from '../middlewares/validateTransitReport.js';

const transitRouter = express.Router();

transitRouter.get('/routes/:city', transitController.getRoutes);
transitRouter.get('/eta', transitController.getETA);
transitRouter.post('/incident', transitValidateReport, transitController.reportIncident);

export default transitRouter;
