const AppRatingsModel = require('../models/appRatings');


const AppRatingsService = {
    createRating: async ({ appId, userId, rating, comment, timestamp }) => {
        // Validate application and user existence
        const applicationExists = await AppRatingsModel.doesApplicationExist(appId);
        if (!applicationExists) {
            throw new Error(`Application with appId ${appId} does not exist`);
        }

        const userExists = await AppRatingsModel.doesUserExist(userId);
        if (!userExists) {
            throw new Error(`User with userId ${userId} does not exist`);
        }

        return await AppRatingsModel.createRating({ appId, userId, rating, comment, timestamp });
    },

    getRatingById: async (ratingId) => {
        return await AppRatingsModel.getRatingById(ratingId);
    },

    getRatingsByAppId: async (appId) => {
        return await AppRatingsModel.getRatingsByAppId(appId);
    },

    updateRating: async (ratingId, updates) => {
        return await AppRatingsModel.updateRating(ratingId, updates);
    },

    deleteRating: async (ratingId) => {
        return await AppRatingsModel.deleteRating(ratingId);
    },

    calculateAverageRating: async (appId) => {
        try {
            const result = await AppRatingsModel.getAverageRating(appId);
    
            if (!result || !result.averagerating) {
                return null; // Return null if no ratings found
            }
    
            return parseFloat(result.averagerating); // Ensure it's a number
        } catch (error) {
            console.error("Error calculating average rating:", error);
            throw error;
        }

    },
};

module.exports = AppRatingsService;
