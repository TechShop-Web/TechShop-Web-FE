import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "https://localhost:7267";

const orderApi = {
  createOrder: async (orderData) => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(`${BASE_URL}/api/orders`, orderData, {
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

      const response = await axios.get(
        `${BASE_URL}/api/orders/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data?.data || [];
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  },
  updateOrderStatus: async (orderId, status) => {
    const res = await axios.patch(
      `${BASE_URL}/api/orders/${orderId}/status`,
      JSON.stringify(status),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  },
};

export default orderApi;
