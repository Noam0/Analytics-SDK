const pool = require("../config/db");

const GeolocationModel = {
    /**
     * Insert new geolocation
     */
    createGeolocation: async ({ appId, userId, latitude, longitude, country }) => {
        //country = 'israel';
        const query = `
            INSERT INTO geographical_analytics (app_id, user_id, latitude, longitude, country)
            VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `;
        const values = [appId, userId, latitude, longitude, country];

        const result = await pool.query(query, values);
        return result.rows[0];
    },

      /**
     * Get all geolocations for a specific application
     */
      getGeolocationsByApp: async (appId) => {
        const query = `
            SELECT user_id, latitude, longitude, country
            FROM geographical_analytics
            WHERE app_id = $1;
        `;
        const result = await pool.query(query, [appId]);
        return result.rows;
    },

    /**
     * Get number of users per country
     */
    getUsersPerCountryByApp: async (appId) => {
        const query = `
            SELECT country, COUNT(DISTINCT user_id) AS user_count
            FROM geographical_analytics
            WHERE app_id = $1
            GROUP BY country
            ORDER BY user_count DESC;
        `;
        const result = await pool.query(query, [appId]);
        return result.rows;
    }
};

module.exports = GeolocationModel;
