import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { toast } from "react-toastify";
import authApi from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";
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
      toast.success("Đăng nhập thành công!");
      form.resetFields();
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Đăng nhập thất bại!");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100"
    >
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-gray-100">
        <div className="text-center mb-6">
          <Title
            level={3}
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-extrabold"
          >
            TechVN Login
          </Title>
          <p className="text-gray-500">Chào mừng bạn quay lại 👋</p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input
              placeholder="Nhập email"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="bg-blue-600 hover:bg-blue-700 rounded-xl shadow"
            >
              Đăng nhập
            </Button>
          </Form.Item>

          <div className="text-center mt-4 text-sm">
            <span className="text-gray-600">Chưa có tài khoản?</span>
            <Link
              to="/register"
              className="ml-1 text-blue-600 font-semibold hover:underline"
            >
              Đăng ký ngay
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
