const pool = require('../config/db');

const LogsModel = {
    createLog: async ({ appId,  logType, description }) => {
        const query = `
            INSERT INTO Logs (appId, logType, description)
            VALUES ($1, $2, $3) RETURNING *;
        `;
        const values = [appId, logType, description];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    getLogById: async (logId) => {
        const query = `SELECT * FROM Logs WHERE logId = $1;`;
        const result = await pool.query(query, [logId]);
        return result.rows[0];
    },

    getLogsByAppId: async (appId) => {
        const query = `SELECT * FROM Logs WHERE appId = $1;`;
        const result = await pool.query(query, [appId]);
        return result.rows;
    },

    getLogsByType: async (appId, type) => {
        const query = `SELECT * FROM Logs WHERE appId = $1 AND logType = $2;`;
        const values = [appId, type];
        const result = await pool.query(query, values);
        return result.rows;
    }

    
};

module.exports = LogsModel;
