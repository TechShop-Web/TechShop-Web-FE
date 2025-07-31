// api/categoryApi.js
import axios from "axios";
import API_CONFIG from "./configApi.js";

const BASE_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CATEGORY}`;

const categoryApi = {
  getAll: async () => {
    const response = await axios.get(`${BASE_URL}/list`);
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(`${BASE_URL}/detail/${id}`);
    return response.data;
  },

  create: async (category) => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(`${BASE_URL}/create`, category, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  update: async (id, category) => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.put(`${BASE_URL}/update/${id}`, category, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  delete: async (id) => {
    const token = localStorage.getItem("accessToken");
    await axios.delete(`${BASE_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default categoryApi;