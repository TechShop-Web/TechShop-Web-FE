import React from "react";
import { Layout, Button, Modal } from "antd";
import { ShoppingCartOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../contexts/AuthContext";

const { Header } = Layout;

const AppHeader = () => {
  const { auth, isAuthenticated, logout } = useAuth();
  const handleLogout = () => {
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to log out?",
      okText: "Yes, Logout",
      cancelText: "Cancel",
      onOk: () => logout(),
    });
  };
  return (
    <Header className="bg-white shadow-md px-8 py-4 flex items-center justify-between">
      <div className="text-3xl font-bold text-blue-600 tracking-tight">
        TechVN
      </div>
      <nav className="flex items-center space-x-6">
        <a href="/" className="text-gray-700 hover:text-blue-500 transition">
          Home
        </a>
        <a
          href="/products"
          className="text-gray-700 hover:text-blue-500 transition"
        >
          Products
        </a>
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 font-medium">
              {auth.email}
            </span>
            <Button
              size="middle"
              type="default"
              icon={<ShoppingCartOutlined />}
            >
              Cart
            </Button>
            <Button
              onClick={handleLogout}
              size="middle"
              type="default"
              icon={<LogoutOutlined />}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <a
              href="/register"
              className="text-gray-700 hover:text-blue-500 transition"
            >
              Sign Up
            </a>
            <a
              href="/login"
              className="text-gray-700 hover:text-blue-500 transition"
            >
              Sign In
            </a>
          </div>
        )}
      </nav>
    </Header>
  );
};

export default AppHeader;
