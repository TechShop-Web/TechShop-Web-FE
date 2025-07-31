import React from "react";
import { Layout, Button, Modal } from "antd";
import { ShoppingCartOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
const { Header } = Layout;

const AppHeader = () => {
  const { auth, isAuthenticated, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to log out?",
      okText: "Yes, Logout",
      cancelText: "Cancel",
      onOk: () => {
        logout();
        navigate("login");
      },
    });
  };
  const handleCart = () => {
    navigate("/cart");
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
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            {isAdmin && (
              <Link
                to="/admin"
                className="text-sm text-blue-600 font-semibold hover:underline"
              >
                Admin Panel
              </Link>
            )}
            <Link to="/account">
              <span className="text-sm text-gray-600 font-medium cursor-pointer hover:underline">
                {auth.email}
              </span>
            </Link>
            <Button
              onClick={handleCart}
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
