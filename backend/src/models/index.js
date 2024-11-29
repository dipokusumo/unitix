const mongoose = require('mongoose');
const User = require('./User');
const EventSchema = require('./Event');

module.exports = {
    User,
    Event: mongoose.model('Event', EventSchema)
}
