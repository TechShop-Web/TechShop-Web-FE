import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Spin, Button, Divider, InputNumber, message } from "antd";
import productApi from "../api/productApi";
import cartApi from "../api/cartApi";
import { useAuth } from "../contexts/AuthContext";

const fallbackVariant = {
  productName: "Ultrabook Pro X1",
  productId: 1,
  id: 1,
  configLabel: "16GB RAM / 512GB SSD",
  price: 1299,
  stock: 12,
  createdAt: "2025-07-27T01:20:21.3633333",
};

const VariantDetailPage = () => {
  const { isAuthenticated } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [variant, setVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchVariant = async () => {
      try {
        const data = await productApi.getVariantDetailById(id);
        setVariant(data?.id ? data : fallbackVariant);
      } catch {
        setVariant(fallbackVariant);
      } finally {
        setLoading(false);
      }
    };

    fetchVariant();
  }, [id]);

  const handleAuthCheck = (callback) => {
    if (!isAuthenticated) {
      message.warning("Please log in to continue");
      navigate("/login");
      return;
    }
    callback();
  };

  const handleAddToCart = async () => {
    handleAuthCheck(async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          message.error("Please log in again.");
          return;
        }

        const payload = {
          productId: variant.productId,
          variantId: variant.id,
          quantity,
          unitPrice: variant.price,
        };

        const res = await cartApi.addToCart(payload, token);
        message.success(`Product added to cart (Cart ID: ${res.cartId})`);
      } catch (error) {
        console.error("Add to cart failed:", error);
        message.error("Failed to add product to cart.");
      }
    });
  };

  const handleBuyNow = () => {
    handleAuthCheck(() => {
      navigate("/confirm-order", {
        state: {
          variant,
          quantity,
        },
      });
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 text-gray-900">
      <h1 className="text-center text-4xl font-semibold text-black mb-10 tracking-tight">
        {variant.productName}
      </h1>

      <Card className="rounded-sm border border-gray-300 shadow-md bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base">
          <p>
            <strong className="text-gray-700">Configuration:</strong>{" "}
            {variant.configLabel}
          </p>
          <p>
            <strong className="text-gray-700">Stock:</strong> {variant.stock}
          </p>
          <p>
            <strong className="text-gray-700">Price:</strong>{" "}
            <span className="text-blue-600 font-medium text-lg">
              ${variant.price}
            </span>
          </p>
          <p>
            <strong className="text-gray-700">Quantity:</strong>{" "}
            <InputNumber
              min={1}
              max={variant.stock}
              value={quantity}
              onChange={setQuantity}
            />
          </p>
        </div>

        <Divider className="border-gray-300" />

        <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">
          <Button
            type="default"
            size="large"
            className="w-full md:w-1/2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-sm"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <Button
            type="primary"
            size="large"
            className="w-full md:w-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-sm"
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default VariantDetailPage;
