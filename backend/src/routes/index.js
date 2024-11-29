const express = require('express');

const eventRouter = require('./eventRoutes');
const userRouter = require('./userRoutes');

const routes = express.Router();

//kumpulkan semua routes disini
routes.use(userRouter);
routes.use(eventRouter);

module.exports = routes;