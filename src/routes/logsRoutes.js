const express = require('express');
const LogsController = require('../controllers/logsController');

const router = express.Router();

/**
 * @swagger
 * /logs:
 *   post:
 *     summary: Create a new log
 *     tags: [Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - appId   
 *               - logType
 *             properties:
 *               appId:
 *                 type: string
 *                 description: The application ID
 *               logType:
 *                 type: string
 *                 description: Type of log (e.g., "Crash", "DailyLogin")
 *               description:
 *                 type: string
 *                 description: Detailed description of the log
 *     responses:
 *       201:
 *         description: Log created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/', LogsController.createLog);

/**
 * @swagger
 * /logs/{logId}:
 *   get:
 *     summary: Get a specific log by logId
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: logId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the log to retrieve
 *     responses:
 *       200:
 *         description: The log data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 logId:
 *                   type: string
 *                 appId:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 logType:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 description:
 *                   type: string
 *       404:
 *         description: Log not found
 *       500:
 *         description: Internal server error
 */
router.get('/:logId', LogsController.getLogById);

/**
 * @swagger
 * /logs/applications/{appId}:
 *   get:
 *     summary: Get all logs for a specific application
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: appId
 *         required: true
 *         schema:
 *           type: string
 *         description: The application ID
 *     responses:
 *       200:
 *         description: List of logs for the application
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   logId:
 *                     type: string
 *                   appId:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   logType:
 *                     type: string
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                   description:
 *                     type: string
 *       404:
 *         description: No logs found for the application
 *       500:
 *         description: Internal server error
 */
router.get('/applications/:appId', LogsController.getLogsByAppId);

/**
 * @swagger
 * /logs/applications/{appId}/logType/{type}:
 *   get:
 *     summary: Get logs by log type for a specific application
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: appId
 *         required: true
 *         schema:
 *           type: string
 *         description: The application ID
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: The type of log (e.g., "Crash", "DailyLogin")
 *     responses:
 *       200:
 *         description: List of logs filtered by type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   logId:
 *                     type: string
 *                   appId:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   logType:
 *                     type: string
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                   description:
 *                     type: string
 *       404:
 *         description: No logs found for the application and log type
 *       500:
 *         description: Internal server error
 */
router.get('/applications/:appId/logType/:type', LogsController.getLogsByType);


module.exports = router;
