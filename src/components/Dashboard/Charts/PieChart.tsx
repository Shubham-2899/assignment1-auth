import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  ChartOptions,
} from "chart.js";
import "./chart-styles.scss";

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
    <div className="pieChartContainer">
      <h3>Pie Chart</h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
