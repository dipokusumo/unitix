const express = require('express');

const eventRouter = require('./eventRoutes');

const router = express.Router();

//kumpulkan semua routes disini
router.use('/events', eventRouter);