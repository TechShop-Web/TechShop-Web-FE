import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import GuestOnlyRoute from "./components/GuestOnlyRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetailPage from "./pages/ProductDetailPage";
import VariantDetailPage from "./pages/VariantDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import ConfirmOrderPage from "./pages/ConfirmOrderPage";
import OrderListPage from "./pages/OrderListPage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import PaymentReturnPage from "./pages/PaymentReturnPage";
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import ProductManagementPage from "./pages/admin/ProductManagementPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import CategoryManagementPage from "./pages/admin/CategoryManagementPage";
import AdminRoute from "./components/AdminRoute";
import CustomerRoute from "./components/CustomerRoute";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route
              path="register"
              element={
                <GuestOnlyRoute>
                  <RegisterPage />
                </GuestOnlyRoute>
              }
            />
            <Route
              path="login"
              element={
                <GuestOnlyRoute>
                  <LoginPage />
                </GuestOnlyRoute>
              }
            />
            <Route path="products/:id" element={<ProductDetailPage />} />
            <Route path="variants/:id" element={<VariantDetailPage />} />
            <Route
              path="confirm-order"
              element={
                <CustomerRoute>
                  <ConfirmOrderPage />
                </CustomerRoute>
              }
            />
            <Route
              path="account"
              element={
                <CustomerRoute>
                  <ProfilePage />
                </CustomerRoute>
              }
            />
            <Route
              path="cart"
              element={
                <CustomerRoute>
                  <CartPage />
                </CustomerRoute>
              }
            />
            <Route
              path="vnpay-return"
              element={
                <CustomerRoute>
                  <PaymentReturnPage />
                </CustomerRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="products" element={<ProductManagementPage />} />
            <Route path="users" element={<UserManagementPage />} />
            <Route path="categories" element={<CategoryManagementPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
