import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Spin } from "antd";
import productApi from "../api/productApi";

const fallbackProductDetail = {
  productName: "Ultrabook Pro X1",
  productId: 1,
  variants: [
    {
      id: 1,
      configLabel: "16GB RAM / 512GB SSD",
      price: 1299,
      stock: 12,
      createdAt: "2025-07-27T01:20:21.3633333",
    },
    {
      id: 2,
      configLabel: "8GB RAM / 256GB SSD",
      price: 999,
      stock: 8,
      createdAt: "2025-07-27T01:20:32.4466667",
    },
  ],
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const data = await productApi.getVariantsByProductId(id);
        if (!data || !Array.isArray(data.variants)) {
          console.warn("Fallback to fake data");
          setProductDetail(fallbackProductDetail);
        } else {
          setProductDetail(data);
        }
      } catch (err) {
        console.error("Error loading product variants:", err);
        setProductDetail(fallbackProductDetail);
      } finally {
        setLoading(false);
      }
    };

    fetchVariants();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-left">
        {productDetail.productName}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productDetail.variants.map((variant) => (
          <Card
            key={variant.id}
            onClick={() => navigate(`/variants/${variant.id}`)}
            bordered={false}
            className="rounded-sm shadow-sm hover:shadow-md transition duration-300 cursor-pointer"
            title={
              <div className="text-lg font-medium text-gray-800">
                {variant.configLabel}
              </div>
            }
          >
            <div className="space-y-2 text-gray-700 text-[15px] leading-normal">
              <div>
                <span className="font-medium text-gray-900">Price: </span>$
                {variant.price}
              </div>
              <div>
                <span className="font-medium text-gray-900">Stock: </span>
                {variant.stock}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailPage;
