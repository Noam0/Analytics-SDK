const pool = require('../config/db');

const LogsModel = {
    createLog: async ({ appId, logType, description, timestamp }) => {
        const query = timestamp
            ? `INSERT INTO logs (appId, logType, description, "timestamp") VALUES ($1, $2, $3, $4) RETURNING *;`
            : `INSERT INTO logs (appId, logType, description) VALUES ($1, $2, $3) RETURNING *;`;

        const values = timestamp ? [appId, logType, description, timestamp] : [appId, logType, description];

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
    },
    deleteLogsByAppId: async (appId) => {
        const query = `DELETE FROM Logs WHERE appid = $1 RETURNING *;`;
        const result = await pool.query(query, [appId]);
        return result.rowCount; // Returns number of deleted rows
    }


    
};

module.exports = LogsModel;
