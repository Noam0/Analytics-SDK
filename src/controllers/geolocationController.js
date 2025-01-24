const GeolocationService = require("../services/geolocationService");

const GeolocationController = {
    /**
     * Save new geolocation
     */
    createGeolocation: async (req, res) => {
        try {
            const { appId, userId, latitude, longitude,  } = req.body;

            if (!appId || !userId || !latitude || !longitude ) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            const newLocation = await GeolocationService.createGeolocation({
                appId,
                userId,
                latitude,
                longitude,
            });

            return res.status(201).json(newLocation);
        } catch (error) {
            console.error("Error saving geolocation:", error);
            return res.status(500).json({ message: "Error saving geolocation", error: error.message });
        }
    },

    /**
     * Get user's latest geolocation
     */
    getGeolocationsByApp: async (req, res) => {
        try {
            const { appId } = req.params;
            if (!appId) {
                return res.status(400).json({ error: "Missing appId parameter" });
            }

            const geolocations = await GeolocationService.getGeolocationsByApp(appId);

            res.status(200).json(geolocations);
        } catch (error) {
            console.error("Error retrieving geolocations:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    /**
     * Get user count per country
     */
    getUsersPerCountry: async (req, res) => {
        try {
            const usersPerCountry = await GeolocationService.getUsersPerCountry();
            return res.status(200).json(usersPerCountry);
        } catch (error) {
            console.error("Error fetching user count per country:", error);
            return res.status(500).json({ message: "Error fetching analytics", error: error.message });
        }
    },
};

module.exports = GeolocationController;