const express = require('express');
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth');
const authorizedRole = require('../middleware/authorizedRole');

const eventRouter = express.Router();

eventRouter.get('/events', eventController.getAll);
eventRouter.get('/event/:id', eventController.getById);
eventRouter.post('/event', auth, authorizedRole('admin'), eventController.create);
eventRouter.put('/event/:id', auth, authorizedRole('admin'), eventController.update);
eventRouter.delete('/event/:id', auth, authorizedRole('admin'), eventController.delete);
eventRouter.get('/events/option-filter', eventController.getFilterOptions); 
eventRouter.get('/events/filter', eventController.getEventsByFilter);
eventRouter.get('/events/search', eventController.search);

module.exports = eventRouter;
