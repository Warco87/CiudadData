// src/config/config.ts
import dotenv from 'dotenv';
dotenv.config();

export class Config {
  static readonly geonames = {
    username: process.env.GEONAMES_USERNAME || '',
    baseUrl: 'http://api.geonames.org'
  };

  static readonly worldBank = {
    baseUrl: 'http://api.worldbank.org/v2'
  };

  static readonly transit = {
    mtaKey: process.env.TFL_API_KEY || '',
    mtaBaseUrl: 'http://api.prod.obanyc.com/api/siri'
  };
}