import React, { useEffect, useState } from "react";
import { Card, Button, Spin, Typography } from "antd";
import productApi from "../api/productApi";
import { FireFilled, FireTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const fallbackProducts = [
  {
    id: 1,
    name: "Ultrabook Pro X1",
    description:
      "A powerful, lightweight laptop ideal for productivity and creative work.",
    brand: "TechNova",
    categoryId: 1,
  },
  {
    id: 2,
    name: "SmartOne S10",
    description:
      "A sleek smartphone with top-tier camera and AI-powered features.",
    brand: "NeoMobile",
    categoryId: 2,
  },
];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.getAll();
        setProducts(
          Array.isArray(data) && data.length ? data : fallbackProducts
        );
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8 text-left">
        <h2 className="text-3xl font-bold text-black tracking-tight inline-flex items-center gap-2 animate-pulse">
          <FireTwoTone /> Hot Sale Picks
        </h2>
        <p className="text-gray-500 mt-1">
          Limited time offers you don't want to miss!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
        {products.map(({ id, name, brand, description }) => (
          <div
            key={id}
            onClick={() => navigate(`/products/${id}`)}
            className="relative group bg-white rounded-sm shadow transition-all duration-300 hover:shadow-xl overflow-hidden"
          >
            <Card bordered={false} className="p-4">
              <Title level={4} className="!mb-2 !text-gray-800">
                {name}
              </Title>
              <Text type="secondary" className="block mb-1">
                <strong>Brand:</strong> {brand}
              </Text>
              <Text className="block mb-2 text-gray-700">{description}</Text>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
