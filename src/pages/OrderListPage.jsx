import React, { useEffect, useState } from "react";
import { Card, Table, Tag, Typography, Spin, message } from "antd";
import orderApi from "../api/orderApi";

const { Title } = Typography;

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await orderApi.getOrderByUserId();
        setOrders(result);
      } catch (err) {
        message.error("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const columns = [
    {
      title: "Order Number",
      dataIndex: "orderNumber",
      key: "orderNumber",
      sorter: (a, b) => a.orderNumber.localeCompare(b.orderNumber),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => {
        const color =
          status === "Pending"
            ? "gold"
            : status === "Cancelled"
            ? "red"
            : "green";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Total (VND)",
      dataIndex: "totalAmount",
      key: "totalAmount",
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      render: (amount) => <span>{amount.toLocaleString("vi-VN")}₫</span>,
    },
    {
      title: "Shipping",
      key: "shipping",
      sorter: (a, b) => a.shippingMethod.localeCompare(b.shippingMethod),
      render: (_, record) => (
        <>
          <p>{record.shippingMethod}</p>
          <p>{record.shippingAddress}</p>
        </>
      ),
    },
    {
      title: "Items",
      dataIndex: "orderItems",
      key: "orderItems",
      render: (items) =>
        items.map((item, idx) => (
          <div key={idx} className="text-xs text-gray-600">
            {item.productName} - {item.variantName} × {item.quantity}
          </div>
        )),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      defaultSortOrder: "descend",
      render: (value) =>
        new Date(value).toLocaleString("vi-VN", {
          dateStyle: "short",
          timeStyle: "short",
        }),
    },
  ];

  return (
    <div className="min-w-32 mx-auto">
      <Card className="shadow border-gray-200 rounded-none">
        <Title level={3} className="mb-4">
          Your Orders
        </Title>
        {loading ? (
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            dataSource={orders}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }}
          />
        )}
      </Card>
    </div>
  );
};

export default OrderListPage;
