const DB = require("../models");
const ResponseAPI = require("../utils/response");

class EventController {
  static async getAll(req, res) {
    try {
      const event = await DB.Event.find();
      return ResponseAPI.success(
        res,
        event
      );
    } catch (error) {
      return ResponseAPI.error(res, error.message);
    }
  }

  static async getById(req, res) {
    try {
      const event = await DB.Event.findById(req.params.id);
      return ResponseAPI.success(res, event);
    } catch (error) {
      return ResponseAPI.error(res, error.message);
    }
  }

  static async create(req, res) {
    try {
      const event = await DB.Event.create(req.body);
      return ResponseAPI.success(res, event);
    } catch (error) {
      return ResponseAPI.error(res, error.message);
    }
  }

  static async update(req, res) {
    try {
      if (!req.params.id) {
        return ResponseAPI.error(res, "ID not provided!", 400);
      }

      const event = await DB.Event.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      return ResponseAPI.success(res, event);
    } catch (error) {
      return ResponseAPI.error(res, error.message);
    }
  }

  static async delete(req, res) {
    try {
      if (!req.params.id) {
        return ResponseAPI.error(res, "ID not provided!", 400);
      }

      const event = await DB.Event.findByIdAndDelete(req.params.id);
      return ResponseAPI.success(res, event);
    } catch (error) {
      return ResponseAPI.error(res, error.message);
    }
  }
}

module.exports = EventController;
