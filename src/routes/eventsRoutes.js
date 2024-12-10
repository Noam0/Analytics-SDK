const express = require("express");
const EventsController = require("../controllers/eventsController");

const router = express.Router();

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - appId
 *               - userId
 *               - eventType
 *             properties:
 *               appId:
 *                 type: string
 *                 description: The ID of the application the event belongs to
 *               userId:
 *                 type: string
 *                 description: The ID of the user who triggered the event
 *               eventType:
 *                 type: string
 *                 description: The type of the event
 *               details:
 *                 type: object
 *                 description: Additional event details in JSON format
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 eventId:
 *                   type: string
 *                   description: The unique ID of the event
 *                 appId:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 eventType:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 details:
 *                   type: object
 *       400:
 *         description: Invalid input or missing required fields
 *       500:
 *         description: Internal server error
 */
router.post("/", EventsController.createEvent);

/**
 * @swagger
 * /events/{eventId}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the event
 *     responses:
 *       200:
 *         description: Event retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 eventId:
 *                   type: string
 *                 appId:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 eventType:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 details:
 *                   type: object
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.get("/:eventId", EventsController.getEvent);

/**
 * @swagger
 * /events/{appId}:
 *   get:
 *     summary: Get events by application ID
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: appId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the application to filter events by
 *     responses:
 *       200:
 *         description: List of events for the specified application
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   eventId:
 *                     type: string
 *                   appId:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   eventType:
 *                     type: string
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                   details:
 *                     type: object
 *       400:
 *         description: Missing appId query parameter
 *       500:
 *         description: Internal server error
 */
router.get("/", EventsController.getEventsByAppId);

/**
 * @swagger
 * /events/{eventId}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the event to delete
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:eventId", EventsController.deleteEvent);

module.exports = router;
