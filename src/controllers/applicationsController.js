const ApplicationsService = require('../services/applicationsService');

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
};

module.exports = ApplicationsController;
