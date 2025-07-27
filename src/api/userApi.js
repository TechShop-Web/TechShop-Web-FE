import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "https://localhost:5003";

const userApi = {
  getUserProfile: async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No token found");

      const decoded = jwtDecode(token);
      const userId = decoded?.UserId || decoded?.nameid || decoded?.sub;
      if (!userId) throw new Error("Invalid token: no userId");

      const response = await axios.get(
        `${BASE_URL}/api/User/detail/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  },
};

export default userApi;
