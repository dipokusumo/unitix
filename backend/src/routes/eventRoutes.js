const express = require('express');
const EventController = require('../controllers/eventController');

const eventRouter = express.Router();

eventRouter.get('/events', EventController.getAll); 
eventRouter.get('/event/:id', EventController.getById); 
eventRouter.post('/event', EventController.create); 
eventRouter.put('/event/:id', EventController.update); 
eventRouter.delete('/event/:id', EventController.delete); 

module.exports = eventRouter;
