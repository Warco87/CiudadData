import axios from 'axios';

export class TransitService {
    private readonly apiKey = process.env.TLF_APP_KEY;
    private readonly baseUrl = 'http://api.prod.obanyc.com/api/siri/stop-monitoring.json';

    async getStopStatus(stopId: string) {
        const response = await axios.get(this.baseUrl, {
            params: {
                key: this.apiKey,
                MonitoringRef: stopId
            }
        });
        return response.data;
    }
}