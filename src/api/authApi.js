import axios from "axios";
import API_CONFIG from "./configApi.js";

const API_BASE_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER}`;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const authApi = {
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post("/login", credentials);
      
      // Store token and user info
      if (response.data.token) {
        localStorage.setItem("accessToken", response.data.token);
        
        // If token contains user info, extract it
        if (response.data.token.accessToken) {
          localStorage.setItem("accessToken", response.data.token.accessToken);
        }
        
        if (response.data.token.role) {
          localStorage.setItem("role", response.data.token.role);
        }
        
        if (response.data.token.email) {
          localStorage.setItem("email", response.data.token.email);
        }
        
        // If user data is returned separately
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
      }
      
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error.response?.data || { message: "Login failed" };
    }
  },

  register: async (userData) => {
    try {
      const payload = {
        ...userData,
        role: "3", // Default to User role
      };
      const response = await axiosInstance.post("/register-user", payload);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error.response?.data || { message: "Registration failed" };
    }
  },

  // Register admin or manager (if needed)
  registerAdminManager: async (userData) => {
    try {
      const response = await axiosInstance.post("/register-admin-manager", userData);
      return response.data;
    } catch (error) {
      console.error("Admin/Manager registration error:", error);
      throw error.response?.data || { message: "Registration failed" };
    }
  },

  // Logout function
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("user");
    // Redirect to login page
    window.location.href = "/login";
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem("accessToken");
    return !!token;
  },

  // Get current user's role
  getUserRole: () => {
    return localStorage.getItem("role");
  },

  // Get current user's email
  getUserEmail: () => {
    return localStorage.getItem("email");
  },

  // Get stored token
  getToken: () => {
    return localStorage.getItem("accessToken");
  },

  // Refresh token (if you implement refresh token logic)
  refreshToken: async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No token found");

      const response = await axiosInstance.post("/refresh-token", {
        token: token
      });

      if (response.data.token) {
        localStorage.setItem("accessToken", response.data.token);
      }

      return response.data;
    } catch (error) {
      console.error("Token refresh error:", error);
      authApi.logout();
      throw error;
    }
  },
};

export default authApi;