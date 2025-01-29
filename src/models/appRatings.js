const pool = require('../config/db');

const AppRatingsModel = {
    createRating: async ({ appId, userId, rating, comment, timestamp }) => {
        const query = timestamp
            ? `INSERT INTO AppRatings (appId, userId, rating, comment, "timestamp") VALUES ($1, $2, $3, $4, $5) RETURNING *;`
            : `INSERT INTO AppRatings (appId, userId, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *;`;

        const values = timestamp ? [appId, userId, rating, comment, timestamp] : [appId, userId, rating, comment];

        const result = await pool.query(query, values);
        return result.rows[0];
    },

    getRatingById: async (ratingId) => {
        const query = `SELECT * FROM AppRatings WHERE ratingId = $1;`;
        const result = await pool.query(query, [ratingId]);
        return result.rows[0];
    },

    getRatingsByAppId: async (appId) => {
        const query = `SELECT * FROM AppRatings WHERE appId = $1;`;
        const result = await pool.query(query, [appId]);
        return result.rows;
    },

    updateRating: async (ratingId, { rating, comment }) => {
        const query = `
            UPDATE AppRatings
            SET rating = COALESCE($2, rating),
                comment = COALESCE($3, comment)
            WHERE ratingId = $1
            RETURNING *;
        `;
        const values = [ratingId, rating, comment];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    deleteRating: async (ratingId) => {
        const query = `DELETE FROM AppRatings WHERE ratingId = $1 RETURNING *;`;
        const result = await pool.query(query, [ratingId]);
        return result.rows[0];
    },

    doesApplicationExist: async (appId) => {
        const query = `SELECT 1 FROM Applications WHERE appId = $1 LIMIT 1;`;
        const result = await pool.query(query, [appId]);
        return result.rowCount > 0;
    },

    doesUserExist: async (userId) => {
        const query = `SELECT 1 FROM Users WHERE userId = $1 LIMIT 1;`;
        const result = await pool.query(query, [userId]);
        return result.rowCount > 0;
    },


getAverageRating: async (appId) => {
    const query = `
        SELECT ROUND(AVG(rating), 1) AS averageRating
        FROM appratings
        WHERE appid = $1;
    `;

    const result = await pool.query(query, [appId]);
    return result.rows[0]; // Returns { averageRating: number } or null
    },
};

module.exports = AppRatingsModel;
