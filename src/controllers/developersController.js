const DevelopersService = require("../services/developersService");
const Validators = require("../utils/validators");
const jwt = require('jsonwebtoken');

const DevelopersController = {
  registerDeveloper: async (req, res) => {
    try {
      const { email, name, apiKey, password } = req.body;

      // Validate email format
      if (!Validators.isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      const developer = await DevelopersService.registerDeveloper({
        email,
        name,
        apiKey,
        password,
      });
      res.status(201).json(developer);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Internal Server Error" });
    }
  },
  getDeveloper: async (req, res) => {
    try {
      const email = req.params.email; // Using email from the route parameter
      const developer = await DevelopersService.getDeveloperDetails(email);
      if (!developer) {
        return res.status(404).json({ error: "Developer not found" });
      }
      res.status(200).json(developer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getDeveloperApplications: async (req, res) => {
    try {
      const { email } = req.params;

      if (!Validators.isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      const applications = await DevelopersService.getApplicationsByDeveloper(
        email
      );
      if (!applications || applications.length === 0) {
        return res
          .status(404)
          .json({ error: "No applications found for this developer." });
      }
      res.status(200).json(applications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
    }
  },

  getAllDevelopers: async (req, res) => {
    try {
      // Call the service to fetch all developers
      const developers = await DevelopersService.getAllDevelopers();
  
      // Return 200 with an empty array if no developers are found
      res.status(200).json(developers || []);
      
    } catch (error) {
      console.error("Error fetching developers:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  },
  loginDeveloper: async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ error: "Missing required fields: email or password" });
        }

        // Authenticate developer
        const developer = await DevelopersService.authenticateDeveloper(email, password);
        if (!developer) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

     
        // Retrieve developer apps
        const apps = await DevelopersService.getDeveloperApplications(email);

        res.status(200).json({
          message: "Login successful",
          developer: {
              email: developer.email,
              name: developer.name,
          },
 
      });
     
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deleteDeveloperApplications: async (req, res) => {
    try {
        const { email } = req.params;

        // Call service function to delete applications
        const deletedCount = await DevelopersService.deleteDeveloperApplications(email);

        if (deletedCount === 0) {
            return res.status(404).json({ message: `No applications found for developer with email: ${email}` });
        }

        res.status(200).json({ message: `Successfully deleted ${deletedCount} applications for developer: ${email}` });
    } catch (error) {
        console.error("Error deleting applications:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  },
  
};

module.exports = DevelopersController;
