import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  stock: number[];
  categories: string[];
};

export const options: ChartOptions<"pie"> = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "right",
    },
    title: {
      display: true,
      text: "Remaining Stock per category",
    },
  },
};
const PieChart = ({ stock, categories }: Props) => {
  const data = {
    labels: categories,
    datasets: [
      {
        label: "Stock Remaining",
        backgroundColor: [
          "rgb(43, 177, 0, 1)",
          "rgb(174,177, 0, 1)",
          "rgb(255,165, 0, 1)",
          "rgb(255,47, 0, 1)",
          "rgb(255,0, 0, 1)",
          "rgba(151, 110, 255, 0.2)",
          "rgba(255, 159, 70, 0.2)",
        ],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: stock,
      },
    ],
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        height: "550px",
        border: "10px solid #ffffff",
        borderRadius: "8px",
        boxShadow: "5px 12px 15px rgba(0, 0, 0, 0.3)",
      }}
    >
      <h3>Pie Chart</h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
