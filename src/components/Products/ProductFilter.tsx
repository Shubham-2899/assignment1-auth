import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  setOwnFilters,
  setOwnProducts,
} from "../../redux/features/productsSlice";
import axios from "axios";
import "./product-filter-styles.scss";

type Props = {};

const ProductFilter = (props: Props) => {
  const [categories, setCategories] = useState<string[]>([]);
  const { ownFilters } = useAppSelector((state) => state.products);

  const dispatch = useAppDispatch();

  const changeHandler = (value: string) => {
    console.log("filter added ", value);

    dispatch(setOwnFilters(value));
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5000/filter?q=${ownFilters.toString()}`
      );
      dispatch(setOwnProducts(res.data));
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownFilters]);

  useEffect(() => {
    const fetchCatgories = async () => {
      const res = await axios.get(`http://localhost:5000/categories`);
      setCategories(res.data);
    };
    fetchCatgories();
  }, []);

  return (
    <Paper sx={{ height: "100%" }}>
      <h4 style={{ margin: "0px", padding: "10px" }}>Filters</h4>
      <ul style={{ padding: "0px", margin: "0px" }} className="filters-list">
        {categories &&
          categories.map((itam, index) => {
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
          })}
      </ul>
    </Paper>
  );
};

export default ProductFilter;
