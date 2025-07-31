// api/adminApi.js
import axios from "axios";
import API_CONFIG from "./configApi.js";

const BASE_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ORDER}`;

const adminApi = {
  async getStatistics({ startDate, endDate, pageIndex = 1, pageSize = 10 }) {
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
          "Content-Type": "application/json",
        },
      });
      
      return response.data?.data || response.data || null;
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        console.error("Unauthorized - please login again");
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      } else if (error.response?.status === 403) {
        console.error("Forbidden - insufficient permissions for statistics");
      }
      
      return null;
    }
  },

  // Additional admin methods that might be useful
  async getAllOrders({ pageIndex = 1, pageSize = 10, status = null }) {
    try {
      const token = localStorage.getItem("accessToken");
      const params = { pageIndex, pageSize };
      
      if (status) {
        params.status = status;
      }

      const response = await axios.get(`${BASE_URL}`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      return response.data || null;
    } catch (error) {
      console.error("Failed to fetch all orders:", error);
      return null;
    }
  },

  async updateOrderStatus(orderId, status) {
    try {
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
    } catch (error) {
      console.error("Failed to update order status:", error);
      throw error;
    }
  },

  async getOrderById(orderId) {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${BASE_URL}/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data;
    } catch (error) {
      console.error("Failed to fetch order details:", error);
      return null;
    }
  },

  // User management methods (if admin needs to manage users)
  async getAllUsers({ pageIndex = 1, pageSize = 10 }) {
    try {
      const token = localStorage.getItem("accessToken");
      const userBaseUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER}`;
      
      const response = await axios.get(`${userBaseUrl}/list`, {
        params: { pageIndex, pageSize },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data;
    } catch (error) {
      console.error("Failed to fetch users:", error);
      return null;
    }
  },

  async createUser(userData) {
    try {
      const token = localStorage.getItem("accessToken");
      const userBaseUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER}`;
      
      const response = await axios.post(`${userBaseUrl}/create`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      return response.data;
    } catch (error) {
      console.error("Failed to create user:", error);
      throw error;
    }
  },

  async deleteUser(userId) {
    try {
      const token = localStorage.getItem("accessToken");
      const userBaseUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER}`;
      
      const response = await axios.delete(`${userBaseUrl}/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data;
    } catch (error) {
      console.error("Failed to delete user:", error);
      throw error;
    }
  },

  // Product management methods (if admin needs to manage products)
  async createProduct(productData) {
    try {
      const token = localStorage.getItem("accessToken");
      const productBaseUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCT}`;
      
      const response = await axios.post(`${productBaseUrl}/create`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      return response.data;
    } catch (error) {
      console.error("Failed to create product:", error);
      throw error;
    }
  },

  async updateProduct(productId, productData) {
    try {
      const token = localStorage.getItem("accessToken");
      const productBaseUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCT}`;
      
      const response = await axios.put(`${productBaseUrl}/update/${productId}`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      return response.data;
    } catch (error) {
      console.error("Failed to update product:", error);
      throw error;
    }
  },

  async deleteProduct(productId) {
    try {
      const token = localStorage.getItem("accessToken");
      const productBaseUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCT}`;
      
      const response = await axios.delete(`${productBaseUrl}/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data;
    } catch (error) {
      console.error("Failed to delete product:", error);
      throw error;
    }
  },

  // Dashboard/Analytics methods
  async getDashboardSummary() {
    try {
      const token = localStorage.getItem("accessToken");
      
      // You might need to create these endpoints in your backend
      const [ordersStats, usersCount, productsCount] = await Promise.all([
        this.getStatistics({ 
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // Last 30 days
          endDate: new Date().toISOString(),
          pageSize: 1
        }),
        this.getAllUsers({ pageSize: 1 }),
        axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCT}/list`, {
          headers: { Authorization: `Bearer ${token}` }
        }).then(res => res.data)
      ]);

      return {
        orders: ordersStats,
        totalUsers: usersCount?.totalCount || 0,
        totalProducts: productsCount?.length || 0
      };
    } catch (error) {
      console.error("Failed to fetch dashboard summary:", error);
      return null;
    }
  }
};

export default adminApi;