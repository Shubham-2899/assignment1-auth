import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getfilterdData,
  getCategories,
  getStockRemainingPerCategory,
} from "../../helpers/DashboardHelpers";
import { useAppSelector } from "../../hooks/reduxHooks";
import BarGraph from "./Charts.js/BarGraph";
import DoughnutChart from "./Charts.js/DoughnutChart";
import LineChart from "./Charts.js/LineChart";
import PieChart from "./Charts.js/PieChart";
import "./dashboard-styles.scss";
import Filter from "./Filter";

type Props = {};

const Dashboard = (props: Props) => {
  const { products, filter } = useAppSelector((state) => state.products);
  const navigate = useNavigate();
  const filteredData = getfilterdData(products, filter);
  const categories = getCategories(filteredData);
  const stocks = getStockRemainingPerCategory(filteredData, categories);

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (!authToken) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box className="dashboardContainer">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "15px",
            border: "10px solid #ffffff",
            borderRadius: "8px",
            boxShadow: "5px 12px 15px rgba(0, 0, 0, 0.3)",
            maxWidth: "1086px",
          }}
        >
          <Typography variant="h4" className="title">
            PRODUCT ANALYSIS
          </Typography>
          <Filter />
        </div>
        <Grid
          container
          spacing={{ xs: 2, md: 2, sm: 2 }}
          columns={{ xs: 4, sm: 4, md: 12 }}
        >
          <Grid item xs={4} sm={4} md={6}>
            <BarGraph stock={stocks} categories={categories} />
          </Grid>
          <Grid xs={4} sm={4} md={6} item>
            <LineChart stock={stocks} categories={categories} />
          </Grid>
          <Grid xs={4} sm={4} md={6} item>
            <PieChart stock={stocks} categories={categories} />
          </Grid>
          <Grid xs={4} sm={4} md={6} item>
            <DoughnutChart stock={stocks} categories={categories} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
