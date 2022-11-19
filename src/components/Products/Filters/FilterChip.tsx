import { Chip } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { removeOwnFilter } from "../../../redux/features/productsSlice";
import "../../Dashboard/dashboard-styles.scss";

type Props = {};

const FilterChip = (props: Props) => {
  const { ownFilters } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const handleDelete = (value: string) => {
    dispatch(removeOwnFilter(value));
  };
  return (
    <div style={{ width: "90%" }} className="chipContainer">
      {ownFilters
        ? ownFilters.map((filter, index) => (
            <Chip
              sx={{ margin: 2 }}
              label={filter}
              key={filter}
              clickable
              size="small"
              onDelete={() => handleDelete(filter)}
            />
          ))
        : null}
    </div>
  );
};

export default FilterChip;
