import React, { useEffect, useState } from "react";
import { Card, Spin, Typography, message } from "antd";
import userApi from "../api/userApi";

const { Title, Text } = Typography;

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await userApi.getUserProfile();
      if (data) setUser(data);
      else message.error("Failed to load user profile.");
      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Card className="max-w-full mx-auto border shadow-sm rounded-none">
      <Title level={4}>Profile Information</Title>
      <div className="text-gray-700 space-y-2">
        <p>
          <Text strong>Name:</Text> {user.fullName}
        </p>
        <p>
          <Text strong>Email:</Text> {user.email}
        </p>
        <p>
          <Text strong>Created At:</Text>{" "}
          {new Date(user.createdAt).toLocaleString("vi-VN")}
        </p>
      </div>
    </Card>
  );
};

export default UserProfile;
