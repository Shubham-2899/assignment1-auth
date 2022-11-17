import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ChartOptions,
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
type Props = {
  stock: number[];
  categories: string[];
};

export const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
    title: {
      display: true,
      text: " Remaining Stock Per Category",
    },
  },
};
const LineChart = ({ stock, categories }: Props) => {
  const data = {
    labels: categories,
    datasets: [
      {
        label: "Remaining Stock ",
        backgroundColor: "rgb(252, 107, 3)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: stock,
      },
    ],
  };

  const total = stock.reduce((acc, curr) => acc + curr, 0);

  return (
    <div
      style={{
        maxWidth: "500px",
        height: "500px",
        border: "10px solid #ffffff",
        borderRadius: "8px",
        boxShadow: "5px 12px 15px rgba(0, 0, 0, 0.3)",
      }}
    >
      <h3>Line Chart</h3>
      <Line data={data} options={options} />
      <div style={{ marginTop: "50px" }}>
        <h3>Total Stock Remaining- {total}</h3>
        <h5>Note -This data is filtered by the Price range</h5>
      </div>
    </div>
  );
};

export default LineChart;
