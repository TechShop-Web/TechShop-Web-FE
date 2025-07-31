// api/paymentApi.js
import axios from "axios";
import API_CONFIG from "./configApi.js";

const BASE_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PAYMENT}`;

const paymentApi = {
  createPaymentUrl: async (paymentData) => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${BASE_URL}/create-vnpay`,
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Return payment URL - adjust based on your API response structure
    return response.data.url || response.data;
  },

  // Handle VNPay return (callback)
  handleVNPayReturn: async (queryParams) => {
    const response = await axios.get(`${BASE_URL}/vnpay-return`, {
      params: queryParams,
    });
    return response.data;
  },

  // Get payment by ID (if needed)
  getPaymentById: async (paymentId) => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${BASE_URL}/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  // Get payments by order ID (if needed)
  getPaymentsByOrderId: async (orderId) => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${BASE_URL}/by-order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default paymentApi;