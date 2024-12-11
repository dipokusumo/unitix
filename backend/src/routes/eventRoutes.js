const express = require("express");
const eventController = require("../controllers/eventController");
const auth = require("../middleware/auth");
const upload = require("../utils/multer");
const authorizedRole = require("../middleware/authorizedRole");

const eventRouter = express.Router();

eventRouter.get(
  "/events-admin",
  auth,
  authorizedRole("admin"),
  eventController.getAllAdmin
);
eventRouter.get("/events", eventController.getAll);
eventRouter.get("/events/upcoming", eventController.getUpcomingEvents);
eventRouter.get("/events/recommended", eventController.getRecommendedEvents);
eventRouter.get("/event/:id", eventController.getById);
eventRouter.post(
  "/event",
  auth,
  authorizedRole("admin"),
  upload.single("posterUrl"),
  eventController.create
);
eventRouter.put(
  "/event/:id",
  auth,
  authorizedRole("admin"),
  upload.single("posterUrl"),
  eventController.update
);
eventRouter.delete(
  "/event/:id",
  auth,
  authorizedRole("admin"),
  eventController.delete
);
eventRouter.get("/events/option-filter", eventController.getFilterOptions);
eventRouter.get("/events/filter", eventController.getEventsByFilter);
eventRouter.get("/events/search", eventController.search);

module.exports = eventRouter;
