import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const productApi = {
  getAll: async () => {
    const response = await axiosInstance.get("/Product/list");
    return response.data;
  },

  getProductDetailById: async (id) => {
    const response = await axiosInstance.get(`/Product/detail/${id}`);
    return response.data;
  },

  createProduct: async (data) => {
    const response = await axiosInstance.post("/Product/create", data);
    return response.data;
  },

  updateProduct: async (id, data) => {
    const response = await axiosInstance.put(`/Product/update/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await axiosInstance.delete(`/Product/delete/${id}`);
    return response.data;
  },

  getAllVariants: async () => {
    const response = await axiosInstance.get("/ProductVariant/list");
    return response.data;
  },

  getVariantDetailById: async (variantId) => {
    const response = await axiosInstance.get(
      `/ProductVariant/detail/${variantId}`
    );

    return response.data;
  },

  createVariant: async (data) => {
    const response = await axiosInstance.post("/ProductVariant/create", data);
    return response.data;
  },

  updateVariant: async (id, data) => {
    const response = await axiosInstance.put(
      `/ProductVariant/update/${id}`,
      data
    );
    return response.data;
  },

  deleteVariant: async (id) => {
    const response = await axiosInstance.delete(`/ProductVariant/delete/${id}`);
    return response.data;
  },

  getVariantsByProductId: async (productId) => {
    const response = await axiosInstance.get(
      `/ProductVariant/groupwithproduct/${productId}`
    );
    return response.data;
  },

  getAllCategories: async () => {
    const response = await axiosInstance.get("/Category/list");
    return response.data;
  },

  getCategoryDetailById: async (id) => {
    const response = await axiosInstance.get(`/Category/detail/${id}`);
    return response.data;
  },

  createCategory: async (data) => {
    const response = await axiosInstance.post("/Category/create", data);
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await axiosInstance.delete(`/Category/delete/${id}`);
    return response.data;
  },
};

export default productApi;
