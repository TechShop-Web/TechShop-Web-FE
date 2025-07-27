import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Spin, Result, Button, message } from "antd";
import orderApi from "../api/orderApi";

const PaymentReturnPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const handleVnpayResult = async () => {
      const responseCode = searchParams.get("vnp_ResponseCode");
      const orderId = searchParams.get("vnp_TxnRef");
      const transactionStatus = searchParams.get("vnp_TransactionStatus");

      try {
        if (responseCode === "00" && transactionStatus === "00") {
          await orderApi.updateOrderStatus(orderId, "Confirmed");
          setStatus("success");
        } else if (transactionStatus === "02") {
          await orderApi.updateOrderStatus(orderId, "Cancelled");
          setStatus("cancelled");
        } else {
          setStatus("failed");
        }
      } catch (error) {
        console.error("Failed to update order status:", error);
        setStatus("error");
      }
    };

    handleVnpayResult();
  }, [searchParams]);

  const renderResult = () => {
    switch (status) {
      case "success":
        return (
          <Result
            status="success"
            title="Payment Successful!"
            subTitle="Your order has been confirmed and payment is successful."
            extra={
              <Button type="primary" onClick={() => navigate("/")}>
                Back to Home
              </Button>
            }
          />
        );
      case "failed":
        return (
          <Result
            status="error"
            title="Payment Failed!"
            subTitle="Something went wrong. Please try again."
            extra={<Button onClick={() => navigate("/")}>Back to Home</Button>}
          />
        );
      case "error":
        return (
          <Result
            status="warning"
            title="Payment succeeded, but order update failed"
            subTitle="Please contact support to verify your order."
            extra={<Button onClick={() => navigate("/")}>Back to Home</Button>}
          />
        );
      case "cancelled":
        return (
          <Result
            status="info"
            title="Payment Cancelled"
            subTitle="Your payment was cancelled. No charges were made."
            extra={<Button onClick={() => navigate("/")}>Back to Home</Button>}
          />
        );

      default:
        return (
          <div className="flex justify-center items-center h-96">
            <Spin size="large" />
          </div>
        );
    }
  };

  return <div className="max-w-3xl mx-auto py-10">{renderResult()}</div>;
};

export default PaymentReturnPage;
