import React, { useState } from "react";
import { Menu, Layout } from "antd";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import UserProfile from "../components/UserProfile";
import OrderListPage from "./OrderListPage";

const { Sider, Content } = Layout;

const ProfilePage = () => {
  const [selectedMenu, setSelectedMenu] = useState("profile");

  const renderContent = () => {
    switch (selectedMenu) {
      case "profile":
        return <UserProfile />;
      case "orders":
        return <OrderListPage />;
      default:
        return null;
    }
  };

  return (
    <Layout className="min-h-screen min-w-max  bg-transparent">
      <Sider
        width={200}
        className="border-r border-gray-200 bg-transparent rounded-none"
        breakpoint="lg"
        collapsedWidth="0"
      >
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          onClick={({ key }) => setSelectedMenu(key)}
          style={{ height: "100%", borderRight: 0 }}
          items={[
            {
              key: "profile",
              icon: <UserOutlined />,
              label: "Profile",
            },
            {
              key: "orders",
              icon: <ShoppingCartOutlined />,
              label: "My Orders",
            },
          ]}
        />
      </Sider>
      <Layout style={{ padding: "10px" }}>
        <Content>{renderContent()}</Content>
      </Layout>
    </Layout>
  );
};

export default ProfilePage;
