const AppRatingsService = require('../services/appRatingsService');

const AppRatingsController = {
    createRating: async (req, res) => {
        try {
            const { appId, userId, rating, comment, timestamp } = req.body;

            if (!appId || !userId || !rating) {
                return res.status(400).json({ error: 'Missing required fields: appId, userId, rating' });
            }

            const newRating = await AppRatingsService.createRating({
                appId,
                userId,
                rating,
                comment,
                timestamp: timestamp || new Date().toISOString() // Default to current time
            });

            res.status(201).json(newRating);
        } catch (error) {
            console.error(error.message);
            if (error.message.includes('does not exist')) {
                return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getRatingById: async (req, res) => {
        try {
            const { ratingId } = req.params;

            const rating = await AppRatingsService.getRatingById(ratingId);
            if (!rating) {
                return res.status(404).json({ error: 'Rating not found' });
            }

            res.status(200).json(rating);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getRatingsByAppId: async (req, res) => {
        try {
            const { appId } = req.params;

            const ratings = await AppRatingsService.getRatingsByAppId(appId);
            if (!ratings || ratings.length === 0) {
                return res.status(404).json({ error: 'No ratings found for this application' });
            }

            res.status(200).json(ratings);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateRating: async (req, res) => {
        try {
            const { ratingId } = req.params;
            const { rating, comment } = req.body;

            const updatedRating = await AppRatingsService.updateRating(ratingId, { rating, comment });
            if (!updatedRating) {
                return res.status(404).json({ error: 'Rating not found' });
            }

            res.status(200).json(updatedRating);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteRating: async (req, res) => {
        try {
            const { ratingId } = req.params;

            const deletedRating = await AppRatingsService.deleteRating(ratingId);
            if (!deletedRating) {
                return res.status(404).json({ error: 'Rating not found' });
            }

            res.status(200).json({ message: 'Rating deleted successfully' });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAverageRatingByAppId: async (req, res) => {
        try {
            const { appId } = req.params;
            const averageRating = await AppRatingsService.calculateAverageRating(appId);
    
            if (averageRating === null || averageRating === undefined) {
                return res.status(404).json({ message: "No ratings found for this application" });
            }
    
            res.status(200).json({ appId, averageRating }); // Ensure averageRating is included
        } catch (error) {
            console.error("Error fetching average rating:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
};

module.exports = AppRatingsController;
