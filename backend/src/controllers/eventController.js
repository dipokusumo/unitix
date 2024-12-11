const DB = require("../models");
const mongoose = require("mongoose");
const ResponseAPI = require("../utils/response");
const fs = require("fs");
const { imageUpload } = require("../utils/imageUtil");

const eventController = {
  async getAll(req, res) {
    try {
      const events = await DB.Event.find();
      return ResponseAPI.success(res, events);
    } catch (error) {
      return ResponseAPI.error(res, error.message);
    }
  },

  async getById(req, res) {
    try {
      const event = await DB.Event.findById(req.params.id);
      return ResponseAPI.success(res, event);
    } catch (error) {
      return ResponseAPI.error(res, error.message);
    }
  },

  async create(req, res) {
    try {
      const event = await DB.Event.create(req.body);

      if (req.file) {
        const urlUploadResult = await imageUpload(req.file);

        event.posterUrl = urlUploadResult.data.url;
      } else {
        return ResponseAPI.badRequest(res, "Banner event is required");
      }

      await event.save();

      return ResponseAPI.success(res, event);
    } catch (error) {
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return ResponseAPI.error(res, error.message);
    }
  },

  async update(req, res) {
    try {
      if (!req.params.id) {
        return ResponseAPI.error(res, "ID not provided!", 400);
      }

      const event = await DB.Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (req.file) {
        const urlUploadResult = await imageUpload(req.file);

        event.posterUrl = urlUploadResult.data.url;
      }
      await event.save();

      return ResponseAPI.success(res, event);
    } catch (error) {
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return ResponseAPI.error(res, error.message);
    }
  },

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return ResponseAPI.error(res, "ID not provided!", 400);
      }

      const event = await DB.Event.findByIdAndDelete(req.params.id);
      return ResponseAPI.success(res, event);
    } catch (error) {
      return ResponseAPI.error(res, error.message);
    }
  },

  async getFilterOptions(req, res) {
    try {
      const locations = await DB.Event.distinct("location");
      const dates = await DB.Event.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$dateTime" },
              month: { $month: "$dateTime" },
              day: { $dayOfMonth: "$dateTime" },
            },
          },
        },
        {
          $project: {
            date: {
              $dateFromParts: {
                year: "$_id.year",
                month: "$_id.month",
                day: "$_id.day",
              },
            },
          },
        },
        {
          $project: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          },
        },
      ]);

      ResponseAPI.success(
        res,
        {
          locations,
          dates: dates.map((item) => item.date),
        },
        "Filter options retrieved successfully"
      );
    } catch (error) {
      return ResponseAPI.serverError(res, error);
    }
  },

  async getEventsByFilter(req, res) {
    try {
      const { location, date } = req.query;

      let filter = {};

      if (location && location.trim() !== "") {
        filter.location = { $regex: `^${location}`, $options: "i" };
      }

      if (date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        startOfDay.setHours(startOfDay.getHours() + 7);

        const endOfDay = new Date(startOfDay);
        endOfDay.setHours(23, 59, 59, 999);
        endOfDay.setHours(endOfDay.getHours() + 7);

        filter.dateTime = { $gte: startOfDay, $lte: endOfDay };
      }

      const events = await DB.Event.find(filter);

      if (events.length === 0) {
        return ResponseAPI.notFound(
          res,
          "No events found for the given filters"
        );
      }

      ResponseAPI.success(res, events, "Events retrieved successfully");
    } catch (error) {
      return ResponseAPI.serverError(res, error);
    }
  },

  async search(req, res) {
    try {
      const { keyword } = req.query;

      if (!keyword || keyword.trim() === "") {
        return ResponseAPI.badRequest(res, "Keyword is required for search");
      }

      const searchRegex = new RegExp(`\\b${keyword}`, "i");

      const events = await DB.Event.find({
        $or: [
          { name: { $regex: searchRegex } },
          { eventBy: { $regex: searchRegex } },
        ],
      });

      if (events.length === 0) {
        return ResponseAPI.notFound(
          res,
          "No events found matching the keyword"
        );
      }

      return ResponseAPI.success(
        res,
        events,
        "Search results retrieved successfully"
      );
    } catch (error) {
      return ResponseAPI.serverError(res, error);
    }
  },

  async getTransactionSummaryByEvent(req, res) {
    const { eventId } = req.params;

    if (!eventId) {
      return ResponseAPI.badRequest(res, "Event ID is required");
    }

    try {
      const summary = await DB.Transaction.aggregate([
        { $match: { eventId: new mongoose.Types.ObjectId(eventId) } },
        {
          $lookup: {
            from: "events",
            localField: "eventId",
            foreignField: "_id",
            as: "event",
          },
        },
        {
          $unwind: {
            path: "$event",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: {
            paymentStatus: "completed",
          },
        },
        {
          $group: {
            _id: "$eventId",
            totalTransactions: { $sum: 1 },
            totalTickets: { $sum: { $size: "$ticketId" } },
            totalRevenue: { $sum: "$amount" },
          },
        },
        {
          $project: {
            _id: 0,
            eventId: "$_id",
            totalTransactions: 1,
            totalTickets: 1,
            totalRevenue: 1,
          },
        },
      ]);

      return ResponseAPI.success(
        res,
        summary,
        "Transaction summary retrieved successfully"
      );
    } catch (error) {
      return ResponseAPI.serverError(res, error);
    }
  },
};

module.exports = eventController;
