import axiosInstance from "./axiosInstance";

const initiateTransaction = async (eventId, quantity) => {
  const { data } = await axiosInstance.post(
    "/transaction",
    { eventId, quantity },
    {
      requiresAuth: true,
    }
  );
  return data;
};

const getTransactionHistory = async () => {
  const { data } = await axiosInstance.get("/transactions/history", {
    requiresAuth: true,
  });
  return data.data;
};

const midtransStatusCallback = async (transaction_id) => {
  const { data } = await axiosInstance.post(
    "/transaction/status",
    { transaction_id },
    {
      requiresAuth: true,
    },
  );
  return data.data;
};

const validateQRCode = async (ticketCode) => {
  const { data } = await axiosInstance.post(
    "/admin/validate-qr-code",
    { ticketCode },
    {
      requiresAuth: true,
    }
  );
  return data;
};

export const transactionApi = {
  initiateTransaction,
  getTransactionHistory,
  midtransStatusCallback,
  validateQRCode,
};
