import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const OrdersChart = ({ data }) => {
  const labels = data.map((item) => item.date);
  const orders = data.map((item) => item.orders);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Orders",
        data: orders,
        borderColor: "#10b981",
        backgroundColor: "#10b981",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} orders`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Line data={chartData} options={options} height={300} />;
};

export default OrdersChart;
