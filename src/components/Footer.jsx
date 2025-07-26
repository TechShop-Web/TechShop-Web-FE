import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer className="text-center bg-white py-4">
      <span className="text-gray-500">
        &copy; {new Date().getFullYear()} TechVN. All rights reserved.
      </span>
    </Footer>
  );
};

export default AppFooter;
