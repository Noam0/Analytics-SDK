const EventsModel = require("../models/events");
const ApplicationsModel = require("../models/applications");
const UsersModel = require("../models/users");

const EventsService = {
  createEvent: async ({ appId, userId, eventType, details }) => {
    // Validate that the application exists
    const applicationExists = await ApplicationsModel.getApplicationByAppId(
      appId
    );
    if (!applicationExists) {
      throw new Error(`Application with ID ${appId} does not exist`);
    }

    // Validate that the user exists
    const userExists = await UsersModel.getUserByIdAndAppId(userId, appId);
    if (!userExists) {
      throw new Error(`User with ID ${userId} does not exist`);
    }

    // Create and return the event
    const timestamp = new Date();
    return await EventsModel.createEvent({
      appId,
      userId,
      eventType,
      timestamp,
      details,
    });
  },

  getEvent: async (eventId) => {
    const event = await EventsModel.getEventById(eventId);
    if (!event) {
      throw new Error(`Event with ID ${eventId} not found`);
    }
    return event;
  },

  getEventsByAppId: async (appId) => {
    // Check if the application exists
    const applicationExists = await ApplicationsModel.getApplicationByAppId(
      appId
    );
    if (!applicationExists) {
      throw new Error(`Application with ID ${appId} does not exist`);
    }

    // Fetch events for the given appId
    return await EventsModel.getEventsByAppId(appId);
  },

  deleteEvent: async (eventId) => {
    const deleted = await EventsModel.deleteEventById(eventId);
    if (!deleted) {
      throw new Error(`Event with ID ${eventId} not found`);
    }
    return { message: `Event with ID ${eventId} deleted successfully` };
  },
};

module.exports = EventsService;
