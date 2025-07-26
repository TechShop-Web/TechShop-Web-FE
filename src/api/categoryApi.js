import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const categoryApi = {
  getAll: async () => {
    const response = await axiosInstance.get("/Category/list");
    return response.data;
  },
};

export default categoryApi;
