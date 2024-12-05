const express = require('express');

const eventRouter = require('./eventRoutes');
const userRouter = require('./userRoutes');
const transactionRouter = require('./transactionRoutes');

const routes = express.Router();

//kumpulkan semua routes disini
routes.use(userRouter);
routes.use(eventRouter);
routes.use(transactionRouter)

module.exports = routes;