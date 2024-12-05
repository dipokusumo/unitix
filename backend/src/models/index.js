const mongoose = require('mongoose');
const userSchema = require('./User');
const eventSchema = require('./Event');
const ticketSchema = require('./Ticket');
const transactionSchema = require('./Transaction');
const CheckinSchema = require('./Checkin');

module.exports = {
    User: mongoose.model('User', userSchema),
    Event: mongoose.model('Event', eventSchema),
    Ticket: mongoose.model('Ticket', ticketSchema),
    Transaction: mongoose.model('Transaction', transactionSchema),
    Checkin: mongoose.model('Checkin', CheckinSchema)
}
