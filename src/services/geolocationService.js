const axios = require("axios");
const GeolocationModel = require("../models/geolocationModel");


//https://openweathermap.org/api/geocoding-api


const GeolocationService = {
    /**
     * Create Geolocation Entry - Auto Retrieves Country
     * @param {Object} geolocationData
     * @returns {Object} Saved Geolocation Data
     */
    createGeolocation: async (geolocationData) => {
        try {
            const { latitude, longitude } = geolocationData;

            // Fetch country from OpenWeather API
            const country = await GeolocationService.getCountryFromCoords(latitude, longitude);

            if (!country) {
                throw new Error("Failed to determine country from coordinates.");
            }

            // Add country to the geolocation data before saving
            geolocationData.country = country;

            // Save geolocation data to database
            return await GeolocationModel.createGeolocation(geolocationData);
        } catch (error) {
            console.error("Error creating geolocation:", error);
            throw error;
        }
    },

    getGeolocationsByApp: async (appId) => {
        return await GeolocationModel.getGeolocationsByApp(appId);
    },

    /**
     * Get number of users per country
     * @returns {Array} List of users count per country
     */
    getUsersPerCountry: async () => {
        return await GeolocationModel.getUsersPerCountry();
    },

    /**
     * Fetch Country from Latitude and Longitude using OpenWeather Reverse Geocoding API
     * @param {Number} latitude
     * @param {Number} longitude
     * @returns {String} Country Code (e.g., "US", "GB")
     */
    getCountryFromCoords: async (latitude, longitude) => {
        try {
            const API_KEY = "1f0bed3f718b10f45357f4a5fd940f2e"; 
            const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;

            const response = await axios.get(url);

            if (response.data.length > 0) {
                return response.data[0].country; // Country code (e.g., "US")
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error fetching country from coordinates:", error);
            return null;
        }
    },
};

module.exports = GeolocationService;
