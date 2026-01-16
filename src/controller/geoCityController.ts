import { Request, Response } from 'express';
import geoNamesService from '../services/geoNamesService.js';
import Report from '../models/report.js';

class GeoCityController {
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
}
export default new GeoCityController();
