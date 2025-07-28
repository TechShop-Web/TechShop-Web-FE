// src/api/adminApi.js
import axios from "axios";

const BASE_URL = "https://localhost:7267";

const adminApi = {
  async getStatistics({ startDate, endDate, pageIndex = 1, pageSize = 10 }) {
    try {
      const response = await axios.get(`${BASE_URL}/api/orders/statistics`, {
        params: {
          startDate,
          endDate,
          pageIndex,
          pageSize,
        },
      });
      return response.data?.data || null;
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
      return null;
    }
  },
};

export default adminApi;
