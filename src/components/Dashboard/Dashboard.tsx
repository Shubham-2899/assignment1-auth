import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getfilterdData,
  getCategories,
  getStockRemainingPerCategory,
} from "../../helpers/DashboardHelpers";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getProducts } from "../../redux/features/productsSlice";
import BarGraph from "./Charts/BarGraph";
import DoughnutChart from "./Charts/DoughnutChart";
import LineChart from "./Charts/LineChart";
import PieChart from "./Charts/PieChart";
import "./dashboard-styles.scss";
import Filter from "./Filter";

type Props = {};

const Dashboard = (props: Props) => {
  const { products, filter } = useAppSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const filteredData = getfilterdData(products, filter);
  const categories = getCategories(filteredData);
  const stocks = getStockRemainingPerCategory(filteredData, categories);

  useEffect(() => {
    let authToken = localStorage.getItem("Auth Token");
    if (!authToken) {
      navigate("/");
    } else {
      dispatch(getProducts());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box className="dashboardContainer">
        <div className="dashboardTitle">
          <Typography variant="h4" className="title">
            PRODUCT ANALYSIS
          </Typography>
          <Filter />
        </div>
        <Grid
          container
          spacing={{ xs: 2, sm: 2, md: 1 }}
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
