import { Button, Layout, Menu, Modal } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  UserOutlined,
  TagsOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const handleLogout = () => {
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to logout?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        logout();
        navigate("/login");
      },
      okButtonProps: {
        danger: true,
      },
    });
  };
  const menuItems = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/admin/products",
      icon: <AppstoreOutlined />,
      label: "Product Management",
    },
    {
      key: "/admin/users",
      icon: <UserOutlined />,
      label: "User Management",
    },
    {
      key: "/admin/categories",
      icon: <TagsOutlined />,
      label: "Category Management",
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider width={220} className="bg-white border-r">
        <div className="h-16 flex items-center justify-center font-bold text-xl border-b">
          Admin Panel
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={menuItems}
          className="mt-2"
        />
      </Sider>

      <Layout>
        <Header className="bg-white px-6 shadow-sm flex items-center justify-between">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Header>
        <Content className="m-6 p-6 bg-white rounded shadow-sm min-h-screen">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
