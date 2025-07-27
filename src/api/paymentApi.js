import axios from "axios";

const BASE_URL = "https://localhost:7262";

const paymentApi = {
  createPaymentUrl: async (paymentData) => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${BASE_URL}/api/payments/create-vnpay`,
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Trả về trực tiếp URL thanh toán
    return response.data.url?.result;
  },
};

export default paymentApi;
