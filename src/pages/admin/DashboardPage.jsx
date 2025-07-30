import React, { useEffect, useState } from "react";
import {
  DatePicker,
  Table,
  InputNumber,
  Button,
  Space,
  Card,
  Typography,
  Row,
  Col,
} from "antd";
import dayjs from "dayjs";
import adminApi from "../../api/adminApi";
import userApi from "../../api/userApi";
import orderApi from "../../api/orderApi";
import productApi from "../../api/productApi"; // Import the new productApi
import RevenueChart from "./RevenueChart";
import OrdersChart from "./OrdersChart";

const { RangePicker } = DatePicker;
const { Title } = Typography;

const DashboardPage = () => {
  const today = dayjs().format("YYYY-MM-DD");
  const tenDaysAgo = dayjs().subtract(10, "day").format("YYYY-MM-DD");

  const [startDate, setStartDate] = useState(tenDaysAgo);
  const [endDate, setEndDate] = useState(today);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  // Fetching statistics (users, products, orders)
  const fetchStats = async () => {
    setLoading(true);
    const res = await adminApi.getStatistics({
      startDate,
      endDate,
      pageIndex,
      pageSize,
    });
    if (res) {
      setData(res.items || []);
      setTotalCount(res.totalCount || 0);
    } else {
      setData([]);
    }
    setLoading(false);
  };

  // Fetching users, products, orders
  const fetchUsers = async () => {
    const token = localStorage.getItem("accessToken");
    const users = await userApi.getAllUsers(token);
    setUserCount(users.length || 0);
  };

  const fetchProducts = async () => {
    const products = await productApi.getAll(); // Fetch all products
    setProductCount(products.length || 0); // Get the count of products
  };

  const fetchOrders = async () => {
    const orders = await orderApi.getOrderByUserId();
    setOrderCount(orders.length || 0);
  };

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchProducts(); // Fetch product count here
    fetchOrders();
  }, [startDate, endDate, pageIndex, pageSize]);

  const chartData = data
    .map((item) => ({
      date: `${item.year}-${String(item.month).padStart(2, "0")}-${String(item.day).padStart(2, "0")}`,
      revenue: Number(item.totalRevenue),
      orders: Number(item.totalOrders),
    }))
    .sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, record) =>
        `${record.year}-${String(record.month).padStart(2, "0")}-${String(record.day).padStart(2, "0")}`,
    },
    {
      title: "Total Orders",
      dataIndex: "totalOrders",
      key: "totalOrders",
    },
    {
      title: "Total Revenue (VND)",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
    },
  ];

  return (
    <div className="space-y-6">
      <Title level={3}>Order Statistics</Title>

      {/* Statistics Cards */}
      <Row gutter={24}>
        <Col span={8}>
          <Card title="Total Users" bordered={false}>
            <div className="text-3xl font-semibold">{userCount}</div>
            <div className="text-gray-500">Users registered</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Total Products" bordered={false}>
            <div className="text-3xl font-semibold">{productCount}</div>
            <div className="text-gray-500">Products available</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Total Orders" bordered={false}>
            <div className="text-3xl font-semibold">{orderCount}</div>
            <div className="text-gray-500">Orders placed</div>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Space size="middle" wrap>
        <RangePicker
          defaultValue={[dayjs(startDate), dayjs(endDate)]}
          onChange={(dates) => {
            if (dates) {
              setStartDate(dates[0].format("YYYY-MM-DD"));
              setEndDate(dates[1].format("YYYY-MM-DD"));
            }
          }}
        />
        <InputNumber
          min={1}
          max={100}
          value={pageSize}
          onChange={setPageSize}
          placeholder="Page Size"
        />
        <InputNumber
          min={1}
          value={pageIndex}
          onChange={setPageIndex}
          placeholder="Page Index"
        />
        <Button onClick={fetchStats} type="primary">
          Apply
        </Button>
      </Space>

      {/* Charts */}
      <Row gutter={24}>
        <Col span={12}>
          <Card title="Revenue per Day">
            <RevenueChart data={chartData} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Total Orders per Day">
            <OrdersChart data={chartData} />
          </Card>
        </Col>
      </Row>

      {/* Table */}
      <Card title="Order Statistics Table">
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={false}
          rowKey={(record) => `${record.year}-${record.month}-${record.day}`}
          className="rounded border"
        />
        <div className="flex justify-between items-center pt-4">
          <span className="text-sm text-gray-500">
            Total: {totalCount} records
          </span>
          <Space>
            <Button
              onClick={() => setPageIndex((prev) => Math.max(prev - 1, 1))}
              disabled={pageIndex <= 1}
            >
              Previous
            </Button>
            <Button
              onClick={() =>
                setPageIndex((prev) =>
                  data.length < pageSize ? prev : prev + 1
                )
              }
              disabled={data.length < pageSize}
            >
              Next
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
