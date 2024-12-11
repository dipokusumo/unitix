const DB = require("../models");
const snap = require("../config/midtrans");
const generateQRCode = require("../utils/generateQRCode");
const sendMail = require("../utils/mailer");
const ResponseAPI = require("../utils/response");
const axios = require("axios");
const { midtransServerKey } = require("../config/env");

const transactionController = {
  async transaction(req, res) {
    try {
      const { eventId, quantity } = req.body;
      const customerId = req.user.id;

      if (!eventId || !quantity) {
        return ResponseAPI.badRequest(res, "Missing required fields");
      }

      if (quantity <= 0) {
        return ResponseAPI.badRequest(
          res,
          "Quantity must be greater than zero"
        );
      }

      const event = await DB.Event.findById(eventId);
      if (!event) {
        return ResponseAPI.notFound(res, "Event not found");
      }

      // // Validasi sisa kuota yang tersedia (quota - reservedQuota)
      // const availableQuota = event.quota - event.reservedQuota;
      // if (availableQuota < quantity) {
      //     return ResponseAPI.conflict(
      //         res,
      //         `Insufficient tickets available. Remaining available quota: ${availableQuota}`
      //     );
      // }

      // // Tambahkan ke reservedQuota
      // event.reservedQuota += quantity;
      // await event.save();

      if (event.quota < quantity) {
        return ResponseAPI.conflict(
          res,
          `Insufficient tickets available. Remaining quota: ${event.quota}`
        );
      }

      const totalAmount = quantity * event.ticketPrice;

      const transaction = await DB.Transaction.create({
        eventId,
        customerId,
        ticketId: [],
        quantity,
        paymentMethod: null,
        amount: totalAmount,
        paymentLink: null,
        paymentStatus: "waiting pay",
      });

      const transactionPayload = {
        transaction_details: {
          order_id: transaction._id.toString(),
          gross_amount: totalAmount,
        },
        customer_details: {
          email: req.user.email,
          name: req.user.name,
        },
        enabled_payments: [
          "gopay",
          "shopeepay",
          "ovo",
          "dana",
          "linkaja",
          "bank_transfer",
          "qris",
        ],
      };

      const midtransResponse = await snap.createTransaction(transactionPayload);

      transaction.paymentLink = midtransResponse.redirect_url;
      await transaction.save();

      return ResponseAPI.success(
        res,
        {
          transaction,
        },
        "Transaction successfully processed"
      );
    } catch (error) {
      console.error("Error processing transaction:", error);
      return ResponseAPI.serverError(res, error);
    }
  },

  async midtransStatusCallback(req, res) {
    try {
      const { transaction_id } = req.body;

      if (!transaction_id) {
        return ResponseAPI.badRequest(res, "Transaction ID is required");
      }

      const customerId = req.user.id;

      const transaction = await DB.Transaction.findOne({
        _id: transaction_id,
        customerId,
      });

      if (!transaction) {
        return ResponseAPI.notFound(
          res,
          "Transaction not found or does not belong to the current user"
        );
      }

      if (transaction.paymentStatus === "completed") {
        return ResponseAPI.success(
          res,
          {
            transaction,
          },
          "Payment has already been completed."
        );
      }

      if (transaction.paymentStatus === "failed") {
        return ResponseAPI.badRequest(res, "Payment has already failed.");
      }

      const url = `https://api.sandbox.midtrans.com/v2/${transaction_id}/status`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(midtransServerKey).toString(
          "base64"
        )}`,
      };

      const response = await axios.get(url, { headers });
      const midtransResponse = response.data;

      switch (midtransResponse.transaction_status) {
        case "settlement":
        case "capture":
          transaction.paymentStatus = "completed";
          transaction.paymentMethod = midtransResponse.payment_type;

          const event = await DB.Event.findById(transaction.eventId);
          if (!event) {
            return ResponseAPI.notFound(res, "Event not found");
          }

          const tickets = [];
          const ticketIds = [];

          for (let i = 0; i < transaction.quantity; i++) {
            const ticketCode = `${event.name[0]}${
              event.eventBy[0]
            }-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
            const qrCodeUrl = await generateQRCode(ticketCode);

            const ticket = await DB.Ticket.create({
              ticketCode,
              eventId: transaction.eventId,
              customerId: transaction.customerId,
              qrCode: qrCodeUrl,
            });

            tickets.push(ticket);
            ticketIds.push(ticket._id);
          }

          event.quota -= transaction.quantity;
          await event.save();

          transaction.ticketId = ticketIds;
          await transaction.save();

          const emailContent = `
            <h1>E-Ticket for ${event.name}</h1>
            <p>Thank you for purchasing tickets for ${
              event.name
            }. Below are your ticket details:</p>
            <ul>
                ${tickets
                  .map(
                    (ticket) =>
                      `<li>Ticket Code: ${ticket.ticketCode}<br>QR Code: <img src="${ticket.qrCode}" alt="QR Code" /></li>`
                  )
                  .join("")}
            </ul>
            `;
          await sendMail(
            req.user.email,
            `E-Ticket for ${event.name}`,
            emailContent
          );
          break;

        case "pending":
          transaction.paymentStatus = "waiting pay";
          break;

        case "deny":
        case "cancel":
        case "expire":
        case "failure":
          transaction.paymentStatus = "failed";
          break;

        default:
          transaction.paymentStatus = "waiting pay";
      }

      await transaction.save();

      return ResponseAPI.success(
        res,
        {
          transaction,
          midtransResponse,
        },
        "Transaction status updated successfully"
      );
    } catch (error) {
      console.error("Error checking payment status:", error);
      return ResponseAPI.serverError(
        res,
        error.message || "Error checking payment status"
      );
    }
  },

  async getTransactionHistory(req, res) {
    try {
      const customerId = req.user.id;

      const transactions = await DB.Transaction.find({ customerId })
        .populate("eventId")
        .populate("ticketId")
        .lean();

      if (!transactions || transactions.length === 0) {
        return ResponseAPI.notFound(res, "No transaction history found");
      }

      const history = transactions.map((transaction) => ({
        transactionId: transaction._id,
        event: transaction.eventId,
        amount: transaction.amount,
        paymentStatus: transaction.paymentStatus,
        paymentMethod: transaction.paymentMethod,
        paymentLink: transaction.paymentLink,
        quantity: transaction.quantity,
        ticketDetails: transaction.ticketId.map((ticket) => ({
          ticketCode: ticket.ticketCode,
          qrCode: ticket.qrCode,
        })),
      }));

      return ResponseAPI.success(
        res,
        { history },
        "Transaction history retrieved successfully"
      );
    } catch (error) {
      console.error("Error retrieving transaction history:", error);
      return ResponseAPI.serverError(
        res,
        error.message || "Error retrieving transaction history"
      );
    }
  },

  async validateQRCode(req, res) {
    try {
      const { ticketCode } = req.body;

      if (!ticketCode) {
        return ResponseAPI.badRequest(res, "Ticket code is required");
      }

      const ticket = await DB.Ticket.findOne({ ticketCode });
      if (!ticket) {
        return ResponseAPI.notFound(res, "Ticket not found");
      }

      const checkin = await DB.Checkin.findOne({ ticketId: ticket._id });
      if (checkin && checkin.isCheckin) {
        return ResponseAPI.conflict(res, "Ticket already checked in");
      }

      await DB.Checkin.create({
        ticketId: ticket._id,
        checkinTime: new Date(),
        isCheckin: true,
      });

      return ResponseAPI.success(res, null, "Ticket validated successfully");
    } catch (error) {
      console.error("Error validating QR code:", error);
      return ResponseAPI.serverError(res, error);
    }
  },
};

module.exports = transactionController;
