const pool = require('../config/db');

const ApplicationsModel = {
    createApplication: async (application) => {
        const query = `
            INSERT INTO Applications (appId, developerEmail, name,description,createdAt)
            VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `;
        const values = [application.appId, application.developerEmail, application.name, application.description,application.createdAt];
        const result = await pool.query(query, values);
        return result.rows[0];
    },
    getApplicationByAppId: async (appId) => {
        const query = `SELECT * FROM Applications WHERE appId = $1;`;
        const result = await pool.query(query, [appId]);
        return result.rows[0];
    },

    getAllApplications: async () => {
        try {
            const query = `SELECT * FROM applications`;
            const result = await pool.query(query);
            
            // Ensure rows are returned properly
            return result.rows;
        } catch (error) {
            console.error('Error fetching applications:', error);
            throw new Error('Failed to retrieve applications');
        }
    },
};

module.exports = ApplicationsModel;
