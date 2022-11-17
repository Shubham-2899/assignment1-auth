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
import { Box, Card } from "@mui/material";

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
      position: "top",
    },
    title: {
      display: true,
      text: "Bar Graph - stoks remaining per category",
    },
  },
};
const BarGraph = ({ stock, categories }: Props) => {
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
    // <div
    //   style={{ maxWidth: "500px", height: "500px" }}
    //   className={matches ? "barGraph" : undefined}
    // >
    <Box sx={{ maxWidth: "500px" }}>
      <Card raised={true} sx={{ maxheight: "500px" }}>
        {/* <CardContent sx={{ maxHeight: "500px" }}> */}
        <h3 style={{ padding: "15px" }}>Bar Graph</h3>
        <Bar data={data} options={options} />
        {/* </CardContent> */}
      </Card>
    </Box>
    // </div>
  );
};

export default BarGraph;
