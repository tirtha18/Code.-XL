import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Problems Solved',
    },
  },
};
const DoughnutChart = ({topicLabels, topicColors, topicCompletion, borderColors}) => {
  const data = {
    labels: topicLabels,
    datasets: [
      {
        label: '# of Problems',
        data: topicCompletion,
        backgroundColor: topicColors,
        borderColor: borderColors,
        borderWidth: 6,
      },
    ],
  };
  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
