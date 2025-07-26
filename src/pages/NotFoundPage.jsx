import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center  text-gray-800 px-6">
      <h1 className="text-5xl font-semibold text-black mb-4">404</h1>
      <p className="text-lg mb-6">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Button
        type="primary"
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-sm px-6 py-2"
        onClick={() => navigate("/")}
      >
        Go Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
