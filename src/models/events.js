const pool = require("../config/db");

const EventsModel = {
  createEvent: async (event) => {
    const query = `
            INSERT INTO Events (appId, userId, eventType, timestamp, details)
            VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `;
    const values = [
      event.appId,
      event.userId,
      event.eventType,
      event.timestamp || new Date(), // Use current timestamp if not provided
      event.details,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  getEventById: async (eventId) => {
    const query = `SELECT * FROM Events WHERE eventId = $1;`;
    const result = await pool.query(query, [eventId]);
    return result.rows[0];
  },

  getEventsByAppId: async (appId) => {
    const query = `
            SELECT * FROM Events
            WHERE appId = $1
            ORDER BY timestamp DESC;
        `;
    const result = await pool.query(query, [appId]);
    return result.rows;
  },

  deleteEventById: async (eventId) => {
    const query = `DELETE FROM Events WHERE eventId = $1 RETURNING *;`;
    const result = await pool.query(query, [eventId]);
    return result.rowCount > 0; // Returns true if a row was deleted
  },
};

module.exports = EventsModel;
