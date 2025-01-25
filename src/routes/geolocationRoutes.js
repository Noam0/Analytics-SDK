const express = require("express");
const GeolocationController = require("../controllers/geolocationController");

const router = express.Router();

/**
 * @swagger
 * /geolocation:
 *   post:
 *     summary: Save new geolocation
 *     tags: [Geolocation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - appId
 *               - userId
 *               - latitude
 *               - longitude
 *             properties:
 *               appId:
 *                 type: string
 *                 description: Application ID
 *               userId:
 *                 type: string
 *                 description: User ID
 *               latitude:
 *                 type: number
 *                 format: float
 *                 description: Latitude of user location
 *               longitude:
 *                 type: number
 *                 format: float
 *                 description: Longitude of user location
 *     responses:
 *       201:
 *         description: Geolocation saved successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post("/", GeolocationController.createGeolocation);


/**
 * @swagger
 * /geolocation/app/{appId}:
 *   get:
 *     summary: Get all user locations for a specific application
 *     tags: [Geolocation]
 *     parameters:
 *       - in: path
 *         name: appId
 *         required: true
 *         schema:
 *           type: string
 *         description: The application ID to retrieve geolocation data
 *     responses:
 *       200:
 *         description: List of geolocation entries for the specified application
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: string
 *                     description: ID of the user
 *                   latitude:
 *                     type: number
 *                     format: float
 *                     description: Latitude of the user's last known location
 *                   longitude:
 *                     type: number
 *                     format: float
 *                     description: Longitude of the user's last known location
 *                   country:
 *                     type: string
 *                     description: Country of the user location
 *       400:
 *         description: Missing or invalid appId parameter
 *       500:
 *         description: Internal server error
 */
router.get("/app/:appId", GeolocationController.getGeolocationsByApp);
/**
 * @swagger
 * /geolocation/users-per-country:
 *   get:
 *     summary: Get user count per country for a specific app
 *     tags: [Geolocation]
 *     parameters:
 *       - in: query
 *         name: appId
 *         required: true
 *         schema:
 *           type: string
 *         description: The application ID to filter the results by
 *     responses:
 *       200:
 *         description: User count per country
 *       400:
 *         description: Missing appId query parameter
 *       500:
 *         description: Internal server error
 */
router.get("/users-per-country", GeolocationController.getUsersPerCountryByApp);

module.exports = router;


//1f0bed3f718b10f45357f4a5fd940f2e