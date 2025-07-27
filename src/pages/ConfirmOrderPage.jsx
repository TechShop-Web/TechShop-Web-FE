import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Input,
  Button,
  message,
  Card,
  Form,
  Divider,
  Spin,
  Select,
} from "antd";
import orderApi from "../api/orderApi";
import productApi from "../api/productApi";
import paymentApi from "../api/paymentApi";
const shippingCostMap = {
  Standard: 0,
  Express: 25000,
  SameDay: 100000,
};

const ConfirmOrderPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { variantId, quantity: quantityParam } = useParams();

  const [form] = Form.useForm();
  const [variant, setVariant] = useState(state?.variant || null);
  const [product, setProduct] = useState(state?.product || null);
  const [quantity, setQuantity] = useState(
    state?.quantity || parseInt(quantityParam) || 1
  );
  const [loading, setLoading] = useState(true);
  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let currentVariant = variant;
        let currentProduct = product;

        if (!currentVariant) {
          currentVariant = await productApi.getVariantDetailById(variantId);
          setVariant(currentVariant);
        }

        if (!currentProduct && currentVariant?.productId) {
          currentProduct = await productApi.getProductDetailById(
            currentVariant.productId
          );
          setProduct(currentProduct);
        }
      } catch (error) {
        message.error("Failed to load product information.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [variantId]);

  const handleShippingMethodChange = (value) => {
    setShippingCost(shippingCostMap[value] || 0);
  };

  const handleConfirmOrder = async (values) => {
    try {
      const subtotal = parseFloat((variant.price * quantity).toFixed(2));
      const order = {
        subtotal,
        shippingCost,
        shippingAddress: values.shippingAddress,
        shippingMethod: values.shippingMethod,
        notes: values.notes || "",
        orderItems: [
          {
            productId: product.id,
            productName: product.name,
            variantId: variant.id,
            variantName: variant.configLabel,
            quantity,
            unitPrice: variant.price,
          },
        ],
      };
      const createdOrder = await orderApi.createOrder(order);
      console.log(createdOrder);
      const paymentData = {
        orderId: createdOrder.data.orderId,
        paymentMethod: "VNPAY",
        amount: subtotal + shippingCost,
      };
      const vnpayUrl = await paymentApi.createPaymentUrl(paymentData);
      if (vnpayUrl) {
        message.success("Redirecting to VNPAY...");
        window.location.href = vnpayUrl;
      } else {
        message.error("Failed to create VNPAY payment URL.");
      }
    } catch (error) {
      message.error("Failed to place order");
    }
  };

  if (loading || !variant || !product) {
    return (
      <div className="flex justify-center items-center h-[30vh]">
        <Spin size="large" />
      </div>
    );
  }

  const subtotal = parseFloat((variant.price * quantity).toFixed(2));
  const total = subtotal + shippingCost;

  return (
    <div className="max-w-full mx-auto px-4 py-10 rounded-none">
      <Card
        title={
          <span className="text-xl font-semibold text-gray-800">
            Confirm Your Order
          </span>
        }
        bordered={false}
        className="border border-gray-200 shadow-sm"
      >
        <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-700 mb-6">
          <p>
            <strong>Product:</strong> {product.name}
          </p>
          <p>
            <strong>Configuration:</strong> {variant.configLabel}
          </p>
          <p>
            <strong>Unit Price:</strong> ${variant.price}
          </p>
          <p>
            <strong>Quantity:</strong> {quantity}
          </p>
          <p>
            <strong>Subtotal:</strong>{" "}
            <span className="text-gray-800 font-medium">${subtotal}</span>
          </p>
          <p>
            <strong>Shipping Cost:</strong>{" "}
            <span className="text-gray-800 font-medium">${shippingCost}</span>
          </p>
          <p className="col-span-2">
            <strong>Total:</strong>{" "}
            <span className="text-green-700 font-bold">${total}</span>
          </p>
        </div>

        <Divider />

        <Form form={form} layout="vertical" onFinish={handleConfirmOrder}>
          <Form.Item
            label="Shipping Address"
            name="shippingAddress"
            rules={[{ required: true, message: "Please enter address" }]}
          >
            <Input.TextArea rows={2} placeholder="123 Street, City, Country" />
          </Form.Item>

          <Form.Item
            label="Shipping Method"
            name="shippingMethod"
            rules={[
              { required: true, message: "Please select shipping method" },
            ]}
          >
            <Select
              placeholder="Select a shipping method"
              onChange={handleShippingMethodChange}
            >
              <Select.Option value="Standard">
                Standard (3–5 days)
              </Select.Option>
              <Select.Option value="Express">Express (1–2 days)</Select.Option>
              <Select.Option value="SameDay">Same Day</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Notes" name="notes">
            <Input.TextArea rows={2} placeholder="Any delivery notes?" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="!bg-gray-800 hover:!bg-gray-900 text-white text-base font-medium"
            >
              Confirm Order (${total})
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ConfirmOrderPage;
