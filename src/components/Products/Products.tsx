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
import EnhancedTable from "./Table/EnhancedTable";
import ProductFilter from "./Filters/ProductFilter";
import "../Dashboard/dashboard-styles.scss";
import { Search } from "@mui/icons-material";
import FilterChip from "./Filters/FilterChip";
import { searchFromFilteredData } from "../../helpers/ProductsPageHelpers";

const Products = () => {
  const { loading, ownProductsAPIData, ownFilters } = useAppSelector(
    (state) => state.products
  );
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://backend-products-api.onrender.com?q=${query}`
      );
      dispatch(setOwnProducts(res.data));
    };
    if (query.length > 0 && ownFilters.length > 0) {
      const data = searchFromFilteredData(
        ownFilters,
        ownProductsAPIData,
        query
      );
      dispatch(setOwnProducts(data));
    } else if (query.length > 2) {
      fetchData();
    } else if (query.length === 0 && ownFilters.length > 0) {
      const fetchData = async () => {
        const res = await axios.get(
          `https://backend-products-api.onrender.com/filter?q=${ownFilters.toString()}`
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
    let authToken = localStorage.getItem("Auth Token");
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
        <>
          <Box className="productContainer">
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={4} sm={8} md={3}>
                <div className="searchContainer">
                  <Search className="searchIcon" />
                  <input
                    type="search"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                  />
                </div>
              </Grid>
              <Grid item xs={4} sm={8} md={9}>
                <div className="gridItem">
                  <FilterChip />
                  <div className="resetBtn">
                    <button
                      onClick={() => {
                        dispatch(resetOwnFilters());
                        setQuery("");
                      }}
                      disabled={ownFilters.length > 0 ? false : true}
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </Grid>
              <Grid item xs={4} sm={8} md={3}>
                <ProductFilter />
              </Grid>
              <Grid item xs={4} sm={8} md={9}>
                <EnhancedTable data={ownProductsAPIData} />
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      ;
    </>
  );
};
export default Products;
