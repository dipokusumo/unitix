const mongoose = require('mongoose');
const userSchema = require('./User');
const eventSchema = require('./Event');

module.exports = {
    User: mongoose.model('User', userSchema),
    Event: mongoose.model('Event', eventSchema)
}
