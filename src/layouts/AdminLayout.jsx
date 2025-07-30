import {
  Layout,
  Menu,
  Modal,
  Avatar,
  Dropdown,
  Button,
  Typography,
} from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  UserOutlined,
  TagsOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    Modal.confirm({
      title: "Xác nhận đăng xuất",
      content: "Bạn có chắc chắn muốn đăng xuất?",
      okText: "Đăng xuất",
      cancelText: "Hủy",
      onOk: () => {
        logout();
        navigate("/login");
      },
      okButtonProps: { danger: true },
      centered: true,
      maskStyle: { backdropFilter: "blur(8px)" },
    });
  };

  const menuItems = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined className="text-lg" />,
      label: <span className="font-medium tracking-wide">Dashboard</span>,
    },
    {
      key: "/admin/products",
      icon: <AppstoreOutlined className="text-lg" />,
      label: <span className="font-medium tracking-wide">Product</span>,
    },
    {
      key: "/admin/users",
      icon: <UserOutlined className="text-lg" />,
      label: <span className="font-medium tracking-wide">User</span>,
    },
    {
      key: "/admin/categories",
      icon: <TagsOutlined className="text-lg" />,
      label: <span className="font-medium tracking-wide">Category</span>,
    },
  ];

  const pageTitles = {
    "/admin/dashboard": "Analytics Dashboard",
    "/admin/products": "Product Management",
    "/admin/users": "User Management",
    "/admin/categories": "Category Management",
  };

  const pageIcons = {
    "/admin/dashboard": <DashboardOutlined className="text-blue-500" />,
    "/admin/products": <AppstoreOutlined className="text-green-500" />,
    "/admin/users": <UserOutlined className="text-purple-500" />,
    "/admin/categories": <TagsOutlined className="text-orange-500" />,
  };

  const currentPageTitle = pageTitles[location.pathname] || "TechVN Admin";
  const currentPageIcon = pageIcons[location.pathname];

  const userMenu = {
    items: [
      {
        key: "profile",
        icon: <UserSwitchOutlined />,
        label: "User Profile",
      },
      {
        key: "settings",
        icon: <SettingOutlined />,
        label: "Settings",
      },
      {
        type: "divider",
      },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: <span onClick={handleLogout}>Logout</span>,
        danger: true,
      },
    ],
  };

  return (
    <Layout className="h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={280}
        className="bg-white/95 backdrop-blur-xl shadow-2xl border-r border-gray-200/50 overflow-hidden h-full"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(248,250,252,0.95))",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 1000,
        }}
        trigger={null}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-center relative border-b border-gray-200/30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-5"></div>
          <div className="relative z-10 font-black text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wider">
            {collapsed ? "TVN" : "TechVN"}
          </div>
          {!collapsed && (
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
          )}
        </div>

        {/* Menu */}
        <div className="px-4 pt-4">
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            onClick={({ key }) => navigate(key)}
            items={menuItems}
            className="bg-transparent border-0 text-base font-medium"
          />
        </div>

        {/* Collapse Button */}
        <div className="absolute bottom-6 left-3">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-md shadow border border-gray-200 hover:border-blue-400 hover:shadow-md rounded-full transition-all duration-300"
            title={collapsed ? "Mở rộng" : "Thu gọn"}
          >
            {collapsed ? (
              <MenuUnfoldOutlined className="text-gray-600 hover:text-blue-500 transition" />
            ) : (
              <MenuFoldOutlined className="text-gray-600 hover:text-blue-500 transition" />
            )}
          </button>
        </div>
      </Sider>

      <Layout>
        <Header
          className="flex justify-between items-center px-8 h-20"
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
            position: "fixed",
            top: 0,
            right: 0,
            left: collapsed ? 80 : 280,
            width: `calc(100% - ${collapsed ? 80 : 280}px)`,
            zIndex: 50,
            transition: "left 0.2s, width 0.2s",
          }}
        >
          <div className="flex items-center gap-3">
            {currentPageIcon}
            <Title level={4} className="m-0 text-gray-800 font-bold">
              {currentPageTitle}
            </Title>
          </div>

          <Dropdown menu={userMenu} trigger={["click"]} placement="bottomRight">
            <div className="flex items-center gap-3 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 px-4 py-2 rounded-2xl border hover:border-blue-100 transition-all duration-300">
              <div className="relative">
                <Avatar
                  size={40}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-white shadow-lg"
                >
                  A
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="hidden md:block">
                <div className="font-semibold text-gray-800 text-sm">Admin</div>
                <div className="text-xs text-gray-500">Quản trị viên</div>
              </div>
            </div>
          </Dropdown>
        </Header>

        <Content
          className="overflow-auto"
          style={{
            marginTop: 80,
            marginLeft: collapsed ? 80 : 280,
            padding: 32,
            height: "calc(100vh - 80px)",
            transition: "margin-left 0.2s",
          }}
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-100/50 min-h-full hover:shadow-3xl transition-all duration-500">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
