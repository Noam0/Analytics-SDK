const ApplicationsService = require('../services/applicationsService');
const pool = require('../config/db');

const ApplicationsController = {
    registerApplication: async (req, res) => {
        try {
            const { appId, developerEmail, name, description } = req.body;

            const application = await ApplicationsService.registerApplication({appId,developerEmail,name,description,
            });
            res.status(201).json(application);
        } catch (error) {
            console.error(error.message);

            // Return specific error messages
            if (error.message.includes('does not exist')) {
                return res.status(400).json({ error: error.message });
            }

            if (error.message.includes('already exists')) {
                return res.status(409).json({ error: error.message });
            }

            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getApplication: async (req, res) => {
        try {
            const appId = req.params.appId; // Using application from the route parameter
            const application = await ApplicationsService.getApplication(appId);
            if (!application) {
                return res.status(404).json({ error: 'Application not found' });
            }
            res.status(200).json(application);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getAllApplications: async (req, res) => {
        try {
            // Correct method name called from ApplicationsService
            const applications = await ApplicationsService.getAllApplications(); 
            
            // Handle the case where no applications are found
            if (!applications || applications.length === 0) {
                return res.status(200).json({
                    message: 'No applications found',
                    data: [],
                });
            }
    
            // Return the applications
            res.status(200).json({
                message: 'Applications retrieved successfully',
                data: applications,
            });
        } catch (error) {
            console.error('Error retrieving applications:', error);
    
            // Send an appropriate server error response
            res.status(500).json({
                error: 'Internal Server Error',
            });
        }
    },



    //SESSIONS

    getAverageUserTime: async (req, res) => {
        try {
            const { appId } = req.params;
    
            const query = `
                WITH session_durations AS (
                    SELECT 
                        u.userid,
                        u.lastseen AS session_start,
                        COALESCE(
                            MAX(CASE WHEN l.logtype = 'LifeCycle' AND l.description = 'App Destroyed' THEN l.timestamp END),
                            MAX(l.timestamp) -- Use last log if "App Destroyed" is missing
                        ) AS session_end,
                        EXTRACT(EPOCH FROM (
                            COALESCE(
                                MAX(CASE WHEN l.logtype = 'LifeCycle' AND l.description = 'App Destroyed' THEN l.timestamp END),
                                MAX(l.timestamp) -- Use fallback last known log
                            ) - u.lastseen
                        )) / 60 AS session_duration
                    FROM users u
                    LEFT JOIN logs l ON u.userid = l.userid 
                    WHERE u.appid = $1
                    AND u.lastseen IS NOT NULL
                    GROUP BY u.userid, u.lastseen
                    HAVING MAX(l.timestamp) > u.lastseen
                )
                SELECT ROUND(AVG(session_duration), 1) AS averageSessionDuration
                FROM session_durations;
            `;
    
            const result = await pool.query(query, [appId]);
    
            if (result.rows.length === 0 || result.rows[0].averagesessionduration === null) {
                return res.status(200).json({ appId, averageUserTime: "0m" });
            }
    
            let averageDuration = result.rows[0].averagesessionduration;
            let durationFormatted = averageDuration >= 60
                ? `${(averageDuration / 60).toFixed(1)}h`
                : `${averageDuration}m`;
    
            res.status(200).json({ appId, averageUserTime: durationFormatted });
        } catch (error) {
            console.error("Error calculating average user time:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

};

module.exports = ApplicationsController;
