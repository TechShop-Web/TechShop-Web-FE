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
            <Route path="confirm-order" element={<ConfirmOrderPage />} />
            <Route path="account" element={<ProfilePage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="vnpay-return" element={<PaymentReturnPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
