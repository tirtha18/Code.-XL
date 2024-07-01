import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { MdPadding } from 'react-icons/md';
ChartJS.register(ArcElement, Tooltip, Legend);
const options = {
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
  
};
const DoughnutChart = ({topicLabels, topicColors, topicCompletion, borderColors}) => {
  const data = {
    labels: topicLabels,
    datasets: [
      {
        label: '# Problems solved',
        data: topicCompletion,
        backgroundColor: topicColors,
        borderColor: borderColors,
        borderWidth: 8,
      },
    ],
  };
  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
