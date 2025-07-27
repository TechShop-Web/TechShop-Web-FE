import axios from "axios";
import productApi from "./productApi";
const API_BASE_URL = "https://localhost:7075";

const cartApi = {
  addToCart: async ({ productId, variantId, quantity, unitPrice }, token) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/Carts`,
      {
        productId,
        variantId,
        quantity,
        unitPrice,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
  showAllItems: async (token) => {
    const res = await axios.get(`${API_BASE_URL}/api/Carts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const cartItems = res.data;

    const detailedItems = await Promise.all(
      cartItems.map(async (item) => {
        const variant = await productApi.getVariantDetailById(item.variantId);
        const product = await productApi.getProductDetailById(
          variant.productId
        );

        return {
          ...item,
          productName: product.name,
          configLabel: variant.configLabel,
        };
      })
    );

    return detailedItems;
  },
  deleteItem: async (id, token) => {
    await axios.delete(`${API_BASE_URL}/api/Carts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default cartApi;
