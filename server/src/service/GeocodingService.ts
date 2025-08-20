import HttpError from "../utils/errors/HttpError";
import axios from "axios";
import http from "http";
import https from "https";

const axiosInstance = axios.create({
  httpAgent: new http.Agent({ family: 4 }),
  httpsAgent: new https.Agent({ family: 4 }),
});

class GeocodingService {
  async getCoordinates(address: Address): Promise<{ lat: number; lon: number }> {
    const { street, city, state, country, postalcode } = address;

    try {
      const response = await axiosInstance.get("https://nominatim.openstreetmap.org/search", {
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
        throw new HttpError("Address not found. Please review the provided address.", 404);
      }

      const location = response.data[0];
      return {
        lat: parseFloat(location.lat),
        lon: parseFloat(location.lon),
      };
    } catch (error: any) {
      console.error("Error fetching coordinates:", error.message || error);
      if (error.code === "ECONNABORTED") {
        throw new HttpError("Geocoding service took too long to respond.", 408);
      }
      throw new HttpError("Error fetching coordinates. Please try again later.", 500, error);
    }
  }
}

export default GeocodingService;
