import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout className="min-h-screen flex flex-col overflow-x-hidden bg-slate-50">
      <div className="sticky top-0 z-50">
        <AppHeader />
      </div>
      <Content className="flex-1">
        <main>
          <Outlet />
        </main>
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default MainLayout;
