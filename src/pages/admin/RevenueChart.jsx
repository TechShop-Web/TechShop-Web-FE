import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = ({ data }) => {
  const labels = data.map((item) => item.date);
  const revenues = data.map((item) => item.revenue);

  const maxRevenue = Math.max(...revenues);
  const roundedMax = Math.ceil(maxRevenue / 1000) * 1000;

  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue (VND)",
        data: revenues,
        backgroundColor: "#1677ff",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => context.parsed.y.toLocaleString("en-US") + " VND",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: roundedMax,
        ticks: {
          callback: (value) => value.toLocaleString("en-US") + " VND",
        },
      },
    },
  };

  return <Bar options={options} data={chartData} height={300} />;
};

export default RevenueChart;
