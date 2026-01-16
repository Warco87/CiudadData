import { Request, Response } from 'express';
import axios from 'axios';
import Report from '../models/report.js';
import worldBankService from '../services/worldBankService.js';
import geoNamesService from '../services/geoNamesService.js';
import geoReportService from '../services/geoReportService.js';

class GeoController {
    // POBLACIÓN (Banco Mundial)
    async getPopulation(req: Request, res: Response) {
        try {
            const { country } = req.params;
            const { year } = req.query;

            const populationData = await worldBankService.getCountryPopulation(country, year);

            if (!populationData) {
                return res.status(404).json({ 
                error: 'Datos de población no encontrados' 
                });
            }

            res.json({
                title: `Consulta Población: ${country}`,
                data: populationData,
                source: 'World Bank API'
            });
        } catch (error) {
            res.status(500).json({ 
                error: error || 'Error interno del servidor' 
            });
        }
    }

    async getCityInfo(req: Request, res: Response) {
        try {
            const { city } = req.params;
            const data = await geoNamesService.getCityData(city);
    
            if (!data) return res.status(404).json({ success: false, message: "Ciudad no encontrada" });
    
            await (Report as any).create({
                title: `Búsqueda Urbana: ${city}`,
                description: `País: ${data.country}, CP: ${data.postalCode}`,
                latitude: data.latitude,
                longitude: data.longitude,
                reporterName: 'GeoNames API'
            });
    
            res.json({ success: true, data });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    }



    // HISTORIAL (MongoDB - POST)
    async saveReport(req: Request, res: Response) {
        try {
            const reportData = req.body;
            const result = await geoReportService.saveReport(reportData);
            
            res.status(201).json({
                success: true,
                ...result
            });
            } catch (error) {
            res.status(500).json({ 
                error: error || 'Error interno del servidor' 
            });
        }
    }
}

export default new GeoController();