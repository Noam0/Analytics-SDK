const pool = require("../config/db");

const DevelopersModel = {
  createDeveloper: async (developer) => {
    const query = `
            INSERT INTO Developers (email, name, apiKey, password)
            VALUES ($1, $2, $3, $4) RETURNING *;
        `;
    const values = [
      developer.email,
      developer.name,
      developer.apiKey,
      developer.password,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },
  getDeveloperByEmail: async (email) => {
    const query = `SELECT * FROM Developers WHERE email = $1;`;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },
  fetchApplicationsByDeveloper: async (email) => {
    const query = `
            SELECT appId, name, description, createdAt
            FROM Applications
            WHERE developerEmail = $1;
        `;
    const result = await pool.query(query, [email]);
    return result.rows;
  },
  doesDeveloperExist: async (email) => {
    const query = `SELECT 1 FROM Developers WHERE email = $1 LIMIT 1;`;
    const result = await pool.query(query, [email]);
    return result.rowCount > 0; // Returns true if the developer exists
  },

  getAllDevelopers: async () => {
    const query = `SELECT * FROM developers;`;
    const result = await pool.query(query);
    return result.rows;
  },

  deleteDeveloperApplications: async (email) => {
    try {
        // Step 1: Delete logs related to applications owned by the developer
        await pool.query(`
            DELETE FROM logs 
            WHERE appid IN (SELECT appid FROM applications WHERE developeremail = $1);
        `, [email]);

        // Step 2: Delete app ratings related to applications owned by the developer
        await pool.query(`
            DELETE FROM appratings 
            WHERE appid IN (SELECT appid FROM applications WHERE developeremail = $1);
        `, [email]);

        // Step 3: Delete the applications after dependent records are removed
        const result = await pool.query(`
            DELETE FROM applications WHERE developeremail = $1 RETURNING *;
        `, [email]);

        return result.rowCount; // Returns the number of deleted applications
    } catch (error) {
        console.error("Error deleting developer applications:", error);
        throw error;
    }
}

};

module.exports = DevelopersModel;
