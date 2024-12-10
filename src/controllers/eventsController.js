const EventsService = require("../services/eventsService");

const EventsController = {
  createEvent: async (req, res) => {
    try {
      const { appId, userId, eventType, details } = req.body;

      // Validate required fields
      if (!appId || !userId || !eventType) {
        return res
          .status(400)
          .json({
            error: "Missing required fields: appId, userId, or eventType",
          });
      }

      // Create the event
      const event = await EventsService.createEvent({
        appId,
        userId,
        eventType,
        details,
      });
      res.status(201).json(event);
    } catch (error) {
      console.error(error.message);

      // Return specific error messages
      if (error.message.includes("does not exist")) {
        return res.status(400).json({ error: error.message });
      }

      if (error.message.includes("violates foreign key")) {
        return res
          .status(400)
          .json({ error: "Invalid appId or userId provided" });
      }

      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getEvent: async (req, res) => {
    try {
      const { eventId } = req.params;

      const event = await EventsService.getEvent(eventId);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }

      res.status(200).json(event);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getEventsByAppId: async (req, res) => {
    try {
      const { appId } = req.query;

      if (!appId) {
        return res.status(400).json({ error: "appId is required" });
      }

      const events = await EventsService.getEventsByAppId(appId);
      res.status(200).json(events);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteEvent: async (req, res) => {
    try {
      const { eventId } = req.params;

      const deleted = await EventsService.deleteEvent(eventId);
      if (!deleted) {
        return res
          .status(404)
          .json({ error: "Event not found or already deleted" });
      }

      res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = EventsController;
