import request from 'supertest';
import app from '../app'; // Asegúrate de que este sea el camino correcto a tu archivo Express

describe('API Routes Integration Tests', () => {
    
    // Test para la ruta de Geografía
    it('GET /api/geo/:city debe retornar 200 OK y el formato correcto', async () => {
        const cityName = 'Caracas';
        
        // Supertest hace una petición real a tu servidor local en memoria
        const response = await request(app).get(`/api/geo/${cityName}`);

        // Si te da error 500, descomenta la siguiente línea para debuguear:
        // if (response.status !== 200) console.log(response.body);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('geonames');
        
        // Verificamos que la estructura interna sea un array
        expect(Array.isArray(response.body.geonames)).toBe(true);
    });

    // Test para manejar errores (Ruta no encontrada)
    it('debe retornar 404 para una ruta que no existe', async () => {
        const response = await request(app).get('/api/ruta/inexistente');
        expect(response.status).toBe(404);
    });
});