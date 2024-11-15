import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      display: false,
      position: 'bottom',
      labels: {
        font: {
          size: 14,
          family: 'Inter, system-ui, sans-serif'
        },
        color: '#e5e7eb',
        boxWidth: 20,
        boxHeight: 20,
        padding: 20
      }
    },
    title: {
      display: true,
      text: 'Progress Breakdown',
      color: '#e5e7eb',
      font: {
        size: 18,
        family: 'Inter, system-ui, sans-serif',
        weight: '500'
      },
      padding: 20
    },
    tooltip: {
      backgroundColor: '#18181b',
      titleColor: '#e5e7eb',
      bodyColor: '#e5e7eb',
      bodyFont: {
        family: 'Inter, system-ui, sans-serif'
      },
      borderColor: '#3f3f46',
      borderWidth: 1,
      padding: 12,
      borderRadius: 8,
    }
  },
  layout: {
    padding: {
      top: 20,
      bottom: 20
    }
  },
  cutout: '75%'
};

const DoughnutChart = ({ topicLabels, topicCompletion }) => {
// Warm color palette
const warmColors = [
  '#FCD34D', // Yellow-400
  '#F59E0B', // Amber-500
  '#EF4444', // Red-500
  '#DC2626', // Red-600
  '#FBBF24', // Yellow-500
  '#F87171', // Red-400
  '#FB923C', // Orange-400
  '#FDBA74', // Orange-300
  '#F472B6', // Pink-400
  '#FCA5A5', // Pink-300
];

// Corresponding border colors
const borderColors = [
  '#F59E0B', // Slightly darker yellow
  '#D97706', // Slightly darker amber
  '#DC2626', // Slightly darker red
  '#B91C1C', // Darker red
  '#D97706', // Slightly darker yellow
  '#E11D48', // Darker pink-red
  '#C2410C', // Darker orange
  '#EA580C', // Darker orange
  '#BE185D', // Darker pink
  '#F87171', // Slightly darker pink
];

  const data = {
    labels: topicLabels,
    datasets: [
      {
        data: topicCompletion,
        backgroundColor: warmColors,
        borderColor: borderColors,
        borderWidth: 2,
        hoverOffset: 4,
        spacing: 2
      }
    ]
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Doughnut 
        data={data} 
        options={options} 
        className="transition-all duration-300 hover:scale-[1.02]"
      />
    </div>
  );
};

export default DoughnutChart;