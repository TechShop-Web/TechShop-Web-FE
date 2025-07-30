import React from "react";
import { Form, Input, Button, Select, Typography } from "antd";
import { toast } from "react-toastify";
import authApi from "../api/authApi";
import { Link } from "react-router-dom";
const { Title } = Typography;
const { Option } = Select;

const RegisterPage = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const result = await authApi.register(values);
      console.log("✅ Register success:", result);
      toast.success("Registration successful!");

      form.resetFields();
    } catch (error) {
      toast.error(error.message || "Registration failed!");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="p-10 shadow-xl rounded-sm w-full max-w-md">
        <Title
          level={3}
          className="text-center font-bold text-4xl text-gray-800 tracking-tight"
        >
          <span className="block mb-2 animate-fade-in">
            Welcome to TechVN.com
          </span>
          <span className="block text-2xl text-blue-600 font-semibold animate-pulse">
            Sign Up
          </span>
        </Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ role: "3" }}
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
          <div className="text-center mt-4">
            <span className="text-gray-600">Already registered?</span>
            <Link
              to="/login"
              className="ml-2 text-blue-600 hover:underline font-medium transition-all duration-200"
            >
              Sign in here
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
