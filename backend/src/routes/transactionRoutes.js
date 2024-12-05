const express = require('express');
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/auth');
const authorizedRole = require('../middleware/authorizedRole');

const transactionRouter = express.Router();

transactionRouter.post('/transaction', auth, authorizedRole('user'), transactionController.transaction);
transactionRouter.get('/transaction/status', auth, authorizedRole('user'), transactionController.midtransStatusCallback);
transactionRouter.get('/transactions/history', auth, authorizedRole('user'), transactionController.getTransactionHistory);
transactionRouter.post('/validate-qr-code', auth, authorizedRole('admin'), transactionController.validateQRCode);

module.exports = transactionRouter;
