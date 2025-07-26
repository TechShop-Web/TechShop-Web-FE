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
  getVariantsByProductId: async (id) => {
    const response = await axiosInstance.get(
      `/ProductVariant/groupwithproduct/${id}`
    );
    return response.data;
  },
  getVariantDetailById: async (variantId) => {
    const response = await axiosInstance.get(
      `/ProductVariant/detail/${variantId}`
    );
    return response.data;
  },
};

export default productApi;
