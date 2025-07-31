// api/orderApi.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import API_CONFIG from "./configApi.js";

const BASE_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ORDER}`;

const orderApi = {
  createOrder: async (orderData) => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(BASE_URL, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  getOrderByUserId: async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No token found");

      const decoded = jwtDecode(token);
      const userId = decoded?.UserId || decoded?.nameid || decoded?.sub;
      if (!userId) throw new Error("Invalid token: no userId");

      const response = await axios.get(`${BASE_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data?.data || response.data || [];
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  },

  getOrderById: async (orderId) => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${BASE_URL}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  updateOrderStatus: async (orderId, status) => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.patch(
      `${BASE_URL}/${orderId}/status`,
      JSON.stringify(status),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  cancelOrder: async (orderId) => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.patch(`${BASE_URL}/${orderId}/cancel`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  // Statistics endpoint (if needed for admin)
  getStatistics: async ({ startDate, endDate, pageIndex = 1, pageSize = 10 }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${BASE_URL}/statistics`, {
        params: {
          startDate,
          endDate,
          pageIndex,
          pageSize,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data?.data || null;
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
      return null;
    }
  },
};

export default orderApi;