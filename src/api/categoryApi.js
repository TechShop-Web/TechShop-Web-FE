import axios from "axios";

const BASE_URL = "https://localhost:5001/api/category";

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
    const response = await axios.post(`${BASE_URL}/create`, category);
    return response.data;
  },

  delete: async (id) => {
    await axios.delete(`${BASE_URL}/delete/${id}`);
  },
};

export default categoryApi;
