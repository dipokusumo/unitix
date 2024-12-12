import axiosInstance from "./axiosInstance";

const initiateTransaction = async ( eventId, quantity ) => {
    const { data } = await axiosInstance.post('/transaction', { eventId, quantity }, {
        requiresAuth: true,
    });
    return data;
};

const getTransactionHistory = async () => {
    const { data } = await axiosInstance.get('/transactions/history', {
        requiresAuth: true,
    });
    return data;
};

const midtransStatusCallback = async ( transactionId ) => {
    const { data } = await axiosInstance.get('/transaction/status', { transactionId }, {
        requiresAuth: true,
    });
    return data;
};

const validateQRCode = async (ticketCode) => {
    const { data } = await axiosInstance.post('/admin/validate-qr-code', { ticketCode }, {
        requiresAuth: true,
    });
    return data;
};

export const transactionApi = {
    initiateTransaction,
    getTransactionHistory,
    midtransStatusCallback,
    validateQRCode
};
