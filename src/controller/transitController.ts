import { Request, Response } from 'express';
import transitService from '../services/transitService.js';
import transitReportService from '../services/transitReportService.js';

class TransitController {
    async getRoutes(req: Request, res: Response) {
        try{
            const {city} = req.params;
            const routes = await transitService.getCityRoutes(city);
            res.json({ success: true, city: req.params, data: routes });
        }catch(error){
            res.send(400).json({error : error})
        }
    }

    async getETA(req: Request, res: Response) {
        const { stop_id } = req.query;
        if (!stop_id) return res.status(400).json({ success: false, message: "stop_id requerido" });
        
        const eta = await transitService.getETA(stop_id as string);
        res.json({ success: true, data: eta });
    }

    async reportIncident(req: Request, res: Response) {
        try {
            const reportData = req.body;
              const result = await transitReportService.saveReport(reportData);
              
              res.status(201).json({
                success: true,
                ...result
              });
        } catch (error) {
            res.status(400).json({ success: false, message: "Error al crear incidente" });
        }
    }
}

export default new TransitController();