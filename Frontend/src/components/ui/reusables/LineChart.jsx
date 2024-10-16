import React, { useState, useEffect } from "react";
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

export default function LineChart({
  mocklabels,
  mockdata,
  showLegend = false,
  showAxes = false,
  chartTitle = "",
  lineColor = "rgb(34 197 94)", 
  delay = 50, 
}) {
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChart(true);
    }, delay);


    return () => clearTimeout(timer);
  }, [delay]);

  const data = {
    labels: mocklabels,
    datasets: [
      {
        data: mockdata,
        fill: false,
        backgroundColor: lineColor,
        borderColor: lineColor,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: showLegend,
      },
      title: {
        display: chartTitle !== "",
        text: chartTitle,
      },
    },
    scales: {
      x: {
        display: showAxes,
      },
      y: {
        display: showAxes,
      },
    },
  };

  return (
    <div className="w-full">
      {showChart ? (
        <Line data={data} options={options} />
      ) : ( ""
       
      )}
    </div>
  );
}
