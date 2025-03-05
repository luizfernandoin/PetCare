import axios from "axios";
import HttpError from "../utils/errors/HttpError";


interface Address {
    street: string;
    number: string;
    city: string;
    state: string;
    country: string;
    postalcode: string;
}

class GeocodingService {
    async getCoordinates(address: Address): Promise<{ lat: number; lon: number }> {
        const street = address.number === "S/N" ? `S/N/${address.street}` : `${address.number}/${address.street}`;
        const { city, state, country, postalcode } = address;

        console.log(street);
        
        try {
            const response = await axios.get("https://nominatim.openstreetmap.org/search", {
                headers: {
                    "User-Agent": `GeoCacthus/1.0 (${process.env.EMAIL_AGENT})`,
                },
                params: {
                    street,
                    city,
                    state,
                    country,
                    postalcode,
                    format: "json",
                    addressdetails: 1,
                    limit: 1,
                },
                timeout: 10000,
            });

            if (!response.data || response.data.length === 0) {
                throw new HttpError("Endereço não encontrado. Por favor, revise o endereço informado.", 404);
            }

            const location = response.data[0];
            return {
                lat: parseFloat(location.lat),
                lon: parseFloat(location.lon),
            };
        } catch (error: any) {
            console.error("Erro ao buscar coordenadas:", error.message || error);
            if (error.code === "ECONNABORTED") {
                throw new HttpError("O serviço de geocodificação demorou muito para responder.", 408);
            }
            throw new HttpError("Erro ao buscar coordenadas. Tente novamente mais tarde.", 500, error);
        }
    }
}

export default GeocodingService;