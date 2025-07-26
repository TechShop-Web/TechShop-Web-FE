import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { toast } from "react-toastify";
import authApi from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const { Title } = Typography;

const LoginPage = () => {
  const { login: setLoginContext } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const result = await authApi.login(values);
      setLoginContext(result.token);
      toast.success("Login successful!");
      form.resetFields();
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed!");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="p-10 shadow-md rounded-sm w-full max-w-md">
        <Title
          level={3}
          className="text-center font-bold text-4xl text-gray-800 tracking-tight"
        >
          <span className="block mb-2 animate-fade-in">
            Welcome to TechShop.com
          </span>
          <span className="block text-2xl text-blue-600 font-semibold animate-pulse">
            Sign In
          </span>
        </Title>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
          <div className="text-center mt-4">
            <span className="text-gray-600">Don't Have an Account?</span>
            <Link
              to="/register"
              className="ml-2 text-blue-600 hover:underline font-medium transition-all duration-200"
            >
              Sign up here
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
