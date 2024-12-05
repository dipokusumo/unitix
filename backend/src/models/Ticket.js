const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    ticketCode: {
        type: String,
        required: true,
        trim: true,
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    qrCode: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = ticketSchema
