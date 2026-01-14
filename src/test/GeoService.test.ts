import { GeoService } from '../service/GeoService';
import axios from 'axios';

// Simulamos la librería axios para interceptar las llamadas a la API
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Definimos la interfaz para evitar el error de 'unknown'
interface GeoNamesResponse {
    geonames: Array<{
        name: string;
        lat: string;
        lng: string;
    }>;
}

describe('GeoService Unit Tests', () => {
    let geoService: GeoService;

    beforeEach(() => {
        geoService = new GeoService();
        jest.clearAllMocks(); // Limpia el historial de llamadas entre tests
    });

    it('debe procesar y retornar datos de GeoNames correctamente', async () => {
        // PREPARAR (Arrange): Definimos una respuesta falsa exacta
        const mockApiResponse = {
            data: {
                geonames: [
                    { name: 'Caracas', lat: '10.48', lng: '-66.87' }
                ]
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {}
        } as any;

        mockedAxios.get.mockResolvedValueOnce(mockApiResponse);

        // ACTUAR (Act): Llamamos al método del servicio
        const result = await geoService.getCityData('Caracas') as GeoNamesResponse;

        // VERIFICAR (Assert): Comprobamos que la lógica de la clase funciona
        expect(result.geonames[0].name).toBe('Caracas');
        expect(result.geonames[0].lat).toBe('10.48'); // Asegúrate que coincida con el mock arriba
        
        // Verificamos que se llamó a la URL correcta de la API
        expect(mockedAxios.get).toHaveBeenCalledWith(
            expect.stringContaining('api.geonames.org'),
            expect.any(Object)
        );
    });

    it('debe lanzar un error si la API de GeoNames falla', async () => {
        // Simulamos un fallo de red
        mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

        await expect(geoService.getCityData('Invalido')).rejects.toThrow('Network Error');
    });
});