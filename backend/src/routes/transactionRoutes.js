const express = require('express');
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/auth');
const authorizedRole = require('../middleware/authorizedRole');

const transactionRouter = express.Router();

transactionRouter.post('/transaction', auth, authorizedRole('customer'), transactionController.transaction);
transactionRouter.get('/transaction/status', auth, authorizedRole('customer'), transactionController.midtransStatusCallback);
transactionRouter.get('/transactions/history', auth, authorizedRole('customer'), transactionController.getTransactionHistory);
transactionRouter.post('/validate-qr-code', auth, authorizedRole('admin'), transactionController.validateQRCode);

module.exports = transactionRouter;
