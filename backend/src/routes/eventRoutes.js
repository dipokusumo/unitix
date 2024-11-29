const express = require('express');
const eventController = require('../controllers/eventController');

const eventRouter = express.Router();

eventRouter.get('/events', eventController.getAll); 
eventRouter.get('/event/:id', eventController.getById); 
eventRouter.post('/event', eventController.create); 
eventRouter.put('/event/:id', eventController.update); 
eventRouter.delete('/event/:id', eventController.delete); 

module.exports = eventRouter;
