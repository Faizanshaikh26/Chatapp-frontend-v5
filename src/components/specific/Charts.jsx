import React from "react";
import { Line, Doughnut } from "react-chartjs-2";

import {
  ArcElement,
  CategoryScale,
  Chart as Chartjs,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { getLast70Days } from "../../lib/features";

Chartjs.register(
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);

const LineChartoptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
        beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

const labels=getLast70Days()
const LineChart = ({value=[]}) => {
  const data = {
    labels:labels,
    datasets: [
      {
        label: "Message",
        data: value,
        borderColor: "rgba(75, 12, 192, 0.2)",
        backgroundColor: "rgba(75, 12, 192, 1)",
        fill: true,
      },
    ],

   
  };
  return <Line data={data} options={LineChartoptions} />;
};


const DoughnutChartoptions ={
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    
    },
    cutout:110

}
const DoughnutChart = ({value=[],labels=[]}) => {

    const data = {
      labels,
      datasets: [
        {
          data:value,
          backgroundColor: ["#FF6384", "#36A2EB"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB",],
          offset:10
        },
      ],
    };
    return <Doughnut style={{zIndex:'99'}} data={data}  options={DoughnutChartoptions}/>;
  };

export { LineChart, DoughnutChart };
