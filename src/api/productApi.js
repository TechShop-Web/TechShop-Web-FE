import axios from "axios";
import API_CONFIG from "./configApi.js";

const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const productApi = {
  getAll: async () => {
    const response = await axiosInstance.get(`${API_CONFIG.ENDPOINTS.PRODUCT}/list`);
    return response.data;
  },

  getProductDetailById: async (id) => {
    const response = await axiosInstance.get(`${API_CONFIG.ENDPOINTS.PRODUCT}/detail/${id}`);
    return response.data;
  },

  createProduct: async (data) => {
    const response = await axiosInstance.post(`${API_CONFIG.ENDPOINTS.PRODUCT}/create`, data);
    return response.data;
  },

  updateProduct: async (id, data) => {
    const response = await axiosInstance.put(`${API_CONFIG.ENDPOINTS.PRODUCT}/update/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await axiosInstance.delete(`${API_CONFIG.ENDPOINTS.PRODUCT}/delete/${id}`);
    return response.data;
  },

  // Product Variant APIs
  getAllVariants: async () => {
    const response = await axiosInstance.get(`${API_CONFIG.ENDPOINTS.PRODUCT_VARIANT}/list`);
    return response.data;
  },

  getVariantDetailById: async (variantId) => {
    const response = await axiosInstance.get(`${API_CONFIG.ENDPOINTS.PRODUCT_VARIANT}/detail/${variantId}`);
    return response.data;
  },

  createVariant: async (data) => {
    const response = await axiosInstance.post(`${API_CONFIG.ENDPOINTS.PRODUCT_VARIANT}/create`, data);
    return response.data;
  },

  updateVariant: async (id, data) => {
    const response = await axiosInstance.put(`${API_CONFIG.ENDPOINTS.PRODUCT_VARIANT}/update/${id}`, data);
    return response.data;
  },

  deleteVariant: async (id) => {
    const response = await axiosInstance.delete(`${API_CONFIG.ENDPOINTS.PRODUCT_VARIANT}/delete/${id}`);
    return response.data;
  },

  getVariantsByProductId: async (productId) => {
    const response = await axiosInstance.get(`${API_CONFIG.ENDPOINTS.PRODUCT_VARIANT}/groupwithproduct/${productId}`);
    return response.data;
  },

  getAllCategories: async () => {
    const response = await axiosInstance.get(`${API_CONFIG.ENDPOINTS.CATEGORY}/list`);
    return response.data;
  },

  getCategoryDetailById: async (id) => {
    const response = await axiosInstance.get(`${API_CONFIG.ENDPOINTS.CATEGORY}/detail/${id}`);
    return response.data;
  },

  createCategory: async (data) => {
    const response = await axiosInstance.post(`${API_CONFIG.ENDPOINTS.CATEGORY}/create`, data);
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await axiosInstance.delete(`${API_CONFIG.ENDPOINTS.CATEGORY}/delete/${id}`);
    return response.data;
  },
};

export default productApi;