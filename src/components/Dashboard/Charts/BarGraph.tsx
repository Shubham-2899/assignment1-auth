import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartOptions } from "chart.js";
import "./chart-styles.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  stock: number[];
  categories: string[];
};

export const options: ChartOptions<"bar"> = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  maintainAspectRatio: true,
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
    title: {
      display: true,
      text: "Remaining Stock Per Category",
    },
  },
};
const BarGraph = ({ stock, categories }: Props) => {
  const data = {
    labels: categories,
    datasets: [
      {
        label: "Remaining Stock ",
        backgroundColor: [
          "rgb(252, 107, 3)",
          "rgb(43, 177, 0, 1)",
          "rgb(174,177, 0, 1)",
          "rgb(255,165, 0, 1)",
          "rgb(255,47, 0, 1)",
          "rgb(255,0, 0, 1)",
        ],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: stock,
      },
    ],
  };

  const total = stock.reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="chartContainer">
      <h3 style={{ padding: "15px" }}>Bar Graph</h3>
      <Bar data={data} options={options} />
      <div style={{ marginTop: "50px" }}>
        <h3>Total Stock Remaining- {total}</h3>
        <h5>Note -This data is filtered by the Price range</h5>
      </div>
    </div>
  );
};

export default BarGraph;
