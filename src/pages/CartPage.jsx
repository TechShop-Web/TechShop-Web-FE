// src/pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import {
  Card,
  List,
  Spin,
  Typography,
  message,
  Button,
  Popconfirm,
} from "antd";
import cartApi from "../api/cartApi";

const { Title, Text } = Typography;

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        message.error("Authentication required");
        return;
      }

      const items = await cartApi.showAllItems(token);
      setCartItems(items);
    } catch (error) {
      console.error("Error loading cart:", error);
      message.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      await cartApi.deleteItem(id, token);
      message.success("Item deleted from cart");
      fetchCart();
    } catch (error) {
      console.error("Delete failed:", error);
      message.error("Failed to delete item");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 text-gray-900">
      <Title level={2} className="text-center mb-8">
        Your Cart
      </Title>
      <Card className="rounded-sm border border-gray-300 shadow-sm">
        <List
          itemLayout="vertical"
          dataSource={cartItems}
          renderItem={(item) => (
            <List.Item>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div className="flex-1">
                  <Text strong className="block">
                    {item.productName}
                  </Text>
                  <Text className="block text-sm text-gray-600">
                    {item.configLabel}
                  </Text>
                </div>
                <div className="text-right">
                  <Text className="block">Quantity: {item.quantity}</Text>
                  <Text className="block">
                    Unit Price:{" "}
                    <span className="text-blue-600 font-semibold">
                      ${item.unitPrice}
                    </span>
                  </Text>
                  <Text className="block">
                    Total:{" "}
                    <span className="text-green-600 font-semibold">
                      ${item.unitPrice * item.quantity}
                    </span>
                  </Text>
                  <div className="mt-2">
                    <Popconfirm
                      title="Are you sure to delete this item?"
                      onConfirm={() => handleDelete(item.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger size="small">
                        Delete
                      </Button>
                    </Popconfirm>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default CartPage;
