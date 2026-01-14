import axios from 'axios';

export class GeoService {
    private readonly username = process.env.GEONAMES_USERNAME;
    private readonly baseUrl = 'http://api.geonames.org/searchJSON';

    async getCityData(city: string) {
        const response = await axios.get(this.baseUrl, {
            params: {
                q: city,
                maxRows: 1,
                username: this.username
            }
        });
        return response.data;
    }
}