import React, { useEffect } from "react";
import { Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  removeOwnFilter,
  setOwnFilters,
  setOwnProducts,
} from "../../../redux/features/productsSlice";
import axios from "axios";
import "./product-filter-styles.scss";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../Loading";

type Props = {};

const ProductFilter = (props: Props) => {
  const { ownFilters } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const { content, isLoading } = useFetch(
    "https://backend-products-api.onrender.com/categories"
  );

  const changeHandler = (value: string) => {
    if (ownFilters.indexOf(value) !== -1) {
      dispatch(removeOwnFilter(value));
      return;
    }
    console.log("filter added ", value);
    dispatch(setOwnFilters(value));
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://backend-products-api.onrender.com/filter?q=${ownFilters.toString()}`
      );
      dispatch(setOwnProducts(res.data));
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownFilters]);

  return (
    <Paper sx={{ height: `calc(100% - 16px)` }}>
      <h4 style={{ margin: "0px", padding: "10px" }}>Filters</h4>
      <ul style={{ padding: "0px", margin: "0px" }} className="filters-list">
        {isLoading ? (
          <Loading />
        ) : (
          content &&
          content.map((itam, index) => {
            return (
              <div key={index}>
                <li
                  onClick={() => changeHandler(itam)}
                  className="categorytext"
                >
                  {itam}
                </li>
              </div>
            );
          })
        )}
      </ul>
    </Paper>
  );
};

export default ProductFilter;
