const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
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
    ticketId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        default: [],
    }],
    quantity: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        default: null,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentLink: {
        type: String,
    },
    paymentStatus: {
        type: String,
        enum: ['waiting pay', 'completed', 'failed'],
        default: 'waiting pay',
    }
}, {
    timestamps: true,
});

module.exports = transactionSchema;