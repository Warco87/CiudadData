import { Request, Response } from "express";
import { GeoService } from "../service/GeoService";
import { TransitService } from "../service/TransitService";

const geoService = new GeoService();
const transitService = new TransitService();

export const getGeo = async (req: Request, res: Response) => {
    try {
        const data = await geoService.getCityData(req.params.city);
        console.log(data);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error en GeoNames" });
    }
};

export const getTransit = async (req: Request, res: Response) => {
    try {
        const data = await transitService.getStopStatus(req.params.stopId);
        console.log(data);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error en Transit API" });
    }
};