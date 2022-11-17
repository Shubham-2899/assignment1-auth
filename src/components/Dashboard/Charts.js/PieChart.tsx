import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  ChartOptions,
} from "chart.js";
import { Card, CardContent } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  stock: number[];
  categories: string[];
};

export const options: ChartOptions<"pie"> = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 2,
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
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 208, 89, 0.2)",
          "rgba(80, 195, 195, 0.2)",
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
    // <div style={{ maxWidth: "500px", height: "500px" }}>
    <Card sx={{ maxWidth: "500px", maxHeight: "550px" }} raised={true}>
      <CardContent>
        <h3>Pie Chart</h3>
        <Pie data={data} options={options} />
      </CardContent>
    </Card>
    // </div>
  );
};

export default PieChart;
