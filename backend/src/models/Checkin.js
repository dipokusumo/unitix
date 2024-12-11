const mongoose = require("mongoose");

const CheckinSchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
    checkinTime: {
      type: Date,
      required: true,
    },
    isCheckin: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = CheckinSchema;
