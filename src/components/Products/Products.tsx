import { Box, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  resetOwnFilters,
  setOwnProducts,
} from "../../redux/features/productsSlice";
import Loading from "../Loading";
import EnhancedTable from "./EnhancedTable";
import ProductFilter from "./ProductFilter";
import "../Dashboard/dashboard-styles.scss";
import { Search } from "@mui/icons-material";
import FilterChip from "./FilterChip";
type Props = {};

const Products = (props: Props) => {
  const { loading, ownProductsAPIData, ownFilters } = useAppSelector(
    (state) => state.products
  );
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000?q=${query}`);
      dispatch(setOwnProducts(res.data));
    };
    const keys = ["title", "category", "description"];
    if (query.length > 2 && ownFilters.length > 0) {
      dispatch(
        setOwnProducts(
          ownProductsAPIData.filter(
            (itam) =>
              ownFilters.some((key) => itam.category === key) &&
              keys.some((key) =>
                itam[key as keyof typeof itam]
                  .toString()
                  .toLowerCase()
                  .includes(query)
              )
          )
        )
      );
    } else if (query.length > 2) {
      fetchData();
    } else if (query.length === 0 && ownFilters.length > 0) {
      const fetchData = async () => {
        const res = await axios.get(
          `http://localhost:5000/filter?q=${ownFilters.toString()}`
        );
        dispatch(setOwnProducts(res.data));
      };
      fetchData();
    } else if (query.length === 0) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (!authToken) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box className="dashboardContainer">
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={4} sm={3} md={3}>
              <div style={{ width: "270px", height: "35px" }}>
                <Search
                  sx={{
                    position: "absolute",
                    padding: "7px 7px 7px 0px",
                    minWidth: "45px",
                  }}
                />
                <input
                  style={{
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                  }}
                  type="search"
                  placeholder="Search..."
                  onChange={(e) => setQuery(e.target.value.toLowerCase())}
                />
              </div>
            </Grid>
            <Grid item xs={4} sm={5} md={9}>
              <div className="gridItem">
                <FilterChip />
                <button
                  onClick={() => {
                    dispatch(resetOwnFilters());
                  }}
                  disabled={ownFilters.length > 0 ? false : true}
                  className="resetBtn"
                >
                  Reset Filters
                </button>
              </div>
            </Grid>
            <Grid item xs={4} sm={3} md={3}>
              <ProductFilter />
            </Grid>
            <Grid item xs={4} sm={5} md={9}>
              <EnhancedTable data={ownProductsAPIData} />
            </Grid>
          </Grid>
        </Box>
      )}
      ;
    </>
  );
};
export default Products;
