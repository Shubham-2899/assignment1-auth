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
} from "chart.js";
import { Card, CardContent } from "@mui/material";

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

export const options = {
  responsive: true,
  title: {
    display: true,
    text: "Remaining Stock per category",
    fontSize: 20,
  },
  legend: {
    display: true,
    position: "left",
  },
};
const LineChart = ({ stock, categories }: Props) => {
  const data = {
    labels: categories,
    datasets: [
      {
        label: "Stock Remaining",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: stock,
      },
    ],
  };

  return (
    // <div style={{ maxWidth: "500px", height: "500px" }}>
    <Card sx={{ maxWidth: "500px", maxHeight: "500px" }} raised={true}>
      <CardContent>
        <h3>Line Chart</h3>
        <Line data={data} options={options} />
      </CardContent>
    </Card>
    // </div>
  );
};

export default LineChart;
