import React, { useEffect, useState } from "react";
import { Card, Spin } from "antd";
import categoryApi from "../api/categoryApi";

const fallbackCategories = [
  { id: 1, name: "Laptops" },
  { id: 2, name: "Smartphones" },
  { id: 3, name: "Tablets" },
  { id: 4, name: "Smartwatches" },
  { id: 5, name: "Accessories" },
  { id: 6, name: "Gaming Gear" },
  { id: 7, name: "Smart Home Devices" },
  { id: 8, name: "Networking Equipment" },
  { id: 9, name: "Audio & Headphones" },
  { id: 10, name: "Monitors & Displays" },
];

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryApi.getAll();

        if (!Array.isArray(data) || data.length === 0) {
          console.warn("API returned null or empty, using fallback data.");
          setCategories(fallbackCategories);
        } else {
          setCategories(data);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setCategories(fallbackCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-left">
        Explore Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Card
            key={cat.id}
            className="rounded-sm shadow hover:shadow-md transition-all duration-300 border border-gray-100"
            bodyStyle={{ padding: "1.5rem" }}
            hoverable
          >
            <h3 className="text-xl font-medium text-gray-700 mb-2 text-center">
              {cat.name}
            </h3>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
