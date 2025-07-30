import React from "react";
import { Layout, Button, Modal } from "antd";
import {
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
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
      okText: "Yes",
      cancelText: "Cancel",
      centered: true,
      onOk: () => logout(),
    });
  };

  const handleCart = () => {
    navigate("/cart");
  };

  return (
    <Header className="bg-[#0f172a] px-8 py-4 flex justify-between items-center shadow-md z-50">
      {/* LOGO */}
      <Link
        to="/"
        className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text"
      >
        TechVN
      </Link>

      {/* NAV LINKS */}
      <nav className="flex items-center gap-6 text-sm">
        <Link to="/" className="text-gray-300 hover:text-blue-400 transition">
          Home
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link
                to="/admin"
                className="text-blue-400 font-semibold hover:underline"
              >
                Admin Panel
              </Link>
            )}

            <Link
              to="/account"
              className="text-gray-400 hover:text-blue-300 font-medium"
            >
              {auth.email}
            </Link>

            {!isAdmin && (
              <Button
                onClick={handleCart}
                icon={<ShoppingCartOutlined />}
                type="default"
                className="text-gray-300 border-gray-600 hover:border-blue-400 hover:text-blue-400 bg-transparent rounded-md"
              >
                Cart
              </Button>
            )}

            <Button
              onClick={handleLogout}
              icon={<LogoutOutlined />}
              type="default"
              className="text-gray-300 border-gray-600 hover:border-red-400 hover:text-red-400 bg-transparent rounded-md"
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/register"
              className="text-gray-300 hover:text-blue-400 transition"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="text-gray-300 hover:text-blue-400 transition"
            >
              Sign In
            </Link>
          </div>
        )}
      </nav>
    </Header>
  );
};

export default AppHeader;
