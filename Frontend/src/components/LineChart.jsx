import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function LineChart({ mocklabels, mockdata }) {
  const data = {
    labels: mocklabels,
    datasets: [
      {
        data: mockdata,
        fill: false,
        backgroundColor: "rgb(34 197 94)",
        borderColor: "rgb(34 197 94)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: true,
      },
      y: {
        display: false,
      },
    },
  };

  return <Line data={data} options={options} />;
}
