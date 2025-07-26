import axios from "axios";

const API_BASE_URL = "https://localhost:5003/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const authApi = {
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post("/User/login", credentials);
      localStorage.setItem("accessToken", response.data.token.accessToken);
      localStorage.setItem("role", response.data.token.role);
      localStorage.setItem("email", response.data.token.email);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  },

  register: async (userData) => {
    try {
      const payload = {
        ...userData,
        role: "3",
      };
      const response = await axiosInstance.post("/User/register-user", payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Registration failed" };
    }
  },
};

export default authApi;
