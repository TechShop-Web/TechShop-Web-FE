import axios from "axios";
import { jwtDecode } from "jwt-decode";
import API_CONFIG from "./configApi.js";

const BASE_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER}`;

const userApi = {
  getUserProfile: async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No token found");

      const decoded = jwtDecode(token);
      const userId = decoded?.UserId || decoded?.nameid || decoded?.sub;
      if (!userId) throw new Error("Invalid token: no userId");

      const response = await axios.get(`${BASE_URL}/detail/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  },

  getAllUsers: async (token) => {
    const response = await axios.get(`${BASE_URL}/list`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  getUserById: async (id, token) => {
    const response = await axios.get(`${BASE_URL}/detail/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  createUser: async (user, token) => {
    const response = await axios.post(`${BASE_URL}/create`, user, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  updateUser: async (id, user, token) => {
    const response = await axios.put(`${BASE_URL}/update/${id}`, user, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  deleteUser: async (id, token) => {
    const response = await axios.delete(`${BASE_URL}/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  login: async (credentials) => {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await axios.post(`${BASE_URL}/register-user`, userData);
    return response.data;
  },
};

export default userApi;