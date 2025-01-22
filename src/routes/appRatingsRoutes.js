const express = require('express');
const AppRatingsController = require('../controllers/appRatingsController');

const router = express.Router();

/**
 * @swagger
 * /app-ratings:
 *   post:
 *     summary: Add a new app rating
 *     tags: [AppRatings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - appId
 *               - userId
 *               - rating
 *             properties:
 *               appId:
 *                 type: string
 *                 description: The ID of the application being rated
 *               userId:
 *                 type: string
 *                 description: The ID of the user giving the rating
 *               rating:
 *                 type: integer
 *                 description: The rating value (1 to 5)
 *               comment:
 *                 type: string
 *                 description: Optional comment about the application
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 description: The timestamp of the rating (optional, defaults to current time if omitted)
 *     responses:
 *       201:
 *         description: Rating added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ratingId:
 *                   type: string
 *                   description: The unique ID of the rating
 *                 appId:
 *                   type: string
 *                   description: The ID of the application
 *                 userId:
 *                   type: string
 *                   description: The ID of the user
 *                 rating:
 *                   type: integer
 *                   description: The rating value
 *                 comment:
 *                   type: string
 *                   description: The optional comment
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   description: Timestamp when the rating was added
 *       400:
 *         description: Invalid input or missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/', AppRatingsController.createRating);

/**
 * @swagger
 * /app-ratings/{ratingId}:
 *   get:
 *     summary: Get a specific app rating by its ID
 *     tags: [AppRatings]
 *     parameters:
 *       - in: path
 *         name: ratingId
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique ID of the rating
 *     responses:
 *       200:
 *         description: Rating retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ratingId:
 *                   type: string
 *                 appId:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 rating:
 *                   type: integer
 *                 comment:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Rating not found
 *       500:
 *         description: Internal server error
 */
router.get('/:ratingId', AppRatingsController.getRatingById);

/**
 * @swagger
 * /app-ratings/applications/{appId}:
 *   get:
 *     summary: Get all ratings for a specific application
 *     tags: [AppRatings]
 *     parameters:
 *       - in: path
 *         name: appId
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the application
 *     responses:
 *       200:
 *         description: A list of ratings for the specified application
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ratingId:
 *                     type: string
 *                   appId:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   rating:
 *                     type: integer
 *                   comment:
 *                     type: string
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: No ratings found for this application
 *       500:
 *         description: Internal server error
 */
router.get('/applications/:appId', AppRatingsController.getRatingsByAppId);

/**
 * @swagger
 * /app-ratings/{ratingId}:
 *   put:
 *     summary: Update a specific rating
 *     tags: [AppRatings]
 *     parameters:
 *       - in: path
 *         name: ratingId
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique ID of the rating
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 description: Updated rating value (1 to 5)
 *               comment:
 *                 type: string
 *                 description: Updated comment
 *     responses:
 *       200:
 *         description: Rating updated successfully
 *       404:
 *         description: Rating not found
 *       500:
 *         description: Internal server error
 */
router.put('/:ratingId', AppRatingsController.updateRating);

/**
 * @swagger
 * /app-ratings/{ratingId}:
 *   delete:
 *     summary: Delete a specific app rating
 *     tags: [AppRatings]
 *     parameters:
 *       - in: path
 *         name: ratingId
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique ID of the rating
 *     responses:
 *       200:
 *         description: Rating deleted successfully
 *       404:
 *         description: Rating not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:ratingId', AppRatingsController.deleteRating);

module.exports = router;
