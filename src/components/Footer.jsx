import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;

const AppFooter = () => {
  const year = new Date().getFullYear();

  return (
    <Footer className="bg-gray-900 text-gray-300 px-8 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Cột 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Về TechVN</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">Giới thiệu</a></li>
            <li><a href="#" className="hover:text-blue-400">Tuyển dụng</a></li>
            <li><a href="#" className="hover:text-blue-400">Blog công nghệ</a></li>
            <li><a href="#" className="hover:text-blue-400">Liên hệ</a></li>
          </ul>
        </div>

        {/* Cột 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Hỗ trợ</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">Trung tâm trợ giúp</a></li>
            <li><a href="#" className="hover:text-blue-400">Câu hỏi thường gặp</a></li>
            <li><a href="#" className="hover:text-blue-400">Gửi phản hồi</a></li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Chính sách</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">Điều khoản sử dụng</a></li>
            <li><a href="#" className="hover:text-blue-400">Chính sách bảo mật</a></li>
            <li><a href="#" className="hover:text-blue-400">Thanh toán & Hoàn tiền</a></li>
          </ul>
        </div>

        {/* Cột 4 */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Kết nối với chúng tôi</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400">Facebook</a></li>
            <li><a href="#" className="hover:text-blue-400">LinkedIn</a></li>
            <li><a href="#" className="hover:text-blue-400">Instagram</a></li>
            <li><a href="#" className="hover:text-blue-400">YouTube</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-6">
        &copy; {year} TechVN. All rights reserved.
      </div>
    </Footer>
  );
};

export default AppFooter;
