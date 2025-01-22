const express = require("express");

const DevelopersController = require("../controllers/developersController");

const router = express.Router();

/**
 * @swagger
 * /developers/getAllDevelopers:
 *   get:
 *     summary: Retrieve all developers
 *     tags: [Developers]
 *     description: Returns a list of all registered developers. If no developers are found, it returns an empty array.
 *     responses:
 *       200:
 *         description: A list of developers (empty array if no data).
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     description: The developer's email address.
 *                   name:
 *                     type: string
 *                     description: The name of the developer.
 *                   apiKey:
 *                     type: string
 *                     description: The unique API key for the developer.
 *       500:
 *         description: Internal server error.
 */
router.get("/getAllDevelopers", DevelopersController.getAllDevelopers);


/**
 * @swagger
 * /developers:
 *   post:
 *     summary: Register a new developer
 *     tags: [Developers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:    # Required fields
 *               - email
 *               - name
 *               - apiKey
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Developer's email address
 *               name:
 *                 type: string
 *                 description: Name of the developer
 *               apiKey:
 *                 type: string
 *                 description: API key for the developer
 *               password:
 *                 type: string
 *                 description: Password for the developer
 *     responses:
 *       201:
 *         description: Developer registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: Developer's email address
 *                 name:
 *                   type: string
 *                   description: Name of the developer
 *                 apiKey:
 *                   type: string
 *                   description: API key for the developer
 *                 password:
 *                   type: string
 *                   description: Hashed password (optional display, for demonstration purposes)
 *       400:
 *         description: Invalid input or missing required fields
 *       500:
 *         description: Internal server error
 */
router.post("/", DevelopersController.registerDeveloper);

/**
 * @swagger
 * /developers/{email}:
 *   get:
 *     summary: Get developer by email
 *     tags: [Developers]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           description: The email of the developer
 *     responses:
 *       200:
 *         description: The developer data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: Developer's email address
 *                 name:
 *                   type: string
 *                   description: Name of the developer
 *                 apiKey:
 *                   type: string
 *                   description: API key for the developer
 *       404:
 *         description: Developer not found
 *       500:
 *         description: Internal server error
 */
router.get("/:email", DevelopersController.getDeveloper);

/**
 * @swagger
 * /developers/{email}/applications:
 *   get:
 *     summary: Retrieve all applications registered by a specific developer
 *     tags: [Developers]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The email of the developer
 *     responses:
 *       200:
 *         description: A list of applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   appId:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Developer not found or no applications registered
 *       500:
 *         description: Internal server error
 */
router.get(
  "/:email/applications",
  DevelopersController.getDeveloperApplications
);



/**
 * @swagger
 * /developers/login:
 *   post:
 *     summary: Login a developer
 *     tags: [Developers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Developer's email address
 *               password:
 *                 type: string
 *                 description: Developer's password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Login message
 *                 developer:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *                     apps:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           appId:
 *                             type: string
 *                           name:
 *                             type: string
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login', DevelopersController.loginDeveloper);





/**
 * @swagger
 * /developers/{email}/applications:
 *   delete:
 *     summary: Delete all applications registered by a specific developer
 *     tags: [Developers]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The email of the developer whose applications should be deleted
 *     responses:
 *       200:
 *         description: Applications deleted successfully
 *       404:
 *         description: Developer not found or no applications to delete
 *       500:
 *         description: Internal server error
 */
router.delete("/:email/applications", DevelopersController.deleteDeveloperApplications);


module.exports = router;
