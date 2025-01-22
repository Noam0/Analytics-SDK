const LogsService = require('../services/logsService');

const LogsController = {
    // Add a new log
      createLog: async (req, res) => {
        try {
            const { appId, logType, description, timestamp } = req.body;

            if (!appId || !logType) {
                return res.status(400).json({ error: 'Missing required fields: appId or logType' });
            }

            const log = await LogsService.createLog({
                appId,
                logType,
                description,
                timestamp: timestamp || undefined // Ensure undefined is passed if timestamp is not provided
            });

            res.status(201).json(log);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Get a specific log by logId
    getLogById: async (req, res) => {
        try {
            const { logId } = req.params;
            const log = await LogsService.getLogById(logId);
            if (!log) {
                return res.status(404).json({ error: 'Log not found' });
            }
            res.status(200).json(log);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Get all logs for an application
    getLogsByAppId: async (req, res) => {
        try {
            const { appId } = req.params;
            const logs = await LogsService.getLogsByAppId(appId);
            res.status(200).json(logs);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // Get logs by log type for an application
    getLogsByType: async (req, res) => {
        try {
            const { appId, type } = req.params;
            const logs = await LogsService.getLogsByType(appId, type);
            res.status(200).json(logs);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteLogsByAppId: async (req, res) => {
        try {
            const { appId } = req.params;

            // Call service function to delete logs
            const deletedCount = await LogsService.deleteLogsByAppId(appId);

            if (deletedCount === 0) {
                return res.status(404).json({ message: `No logs found for appId: ${appId}` });
            }

            res.status(200).json({ message: `Successfully deleted ${deletedCount} logs for appId: ${appId}` });
        } catch (error) {
            console.error("Error deleting logs:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    // Get logs for an application within a time interval
   
};

module.exports = LogsController;
