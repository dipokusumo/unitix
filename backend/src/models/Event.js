const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quota: {
      type: Number,
      required: true,
      min: 1,
    },
    ticketPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    posterUrl: {
      type: String,
      default: null,
    },
    eventBy: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = EventSchema
