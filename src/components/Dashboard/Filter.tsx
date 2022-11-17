import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { createFilterObject } from "../../helpers/DashboardHelpers";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setFilter } from "../../redux/features/productsSlice";

type Props = {};

const options = ["0-100", "100-500", "500-700", "700-"];

const Filter = (props: Props) => {
  const [filterValue, setFilterValue] = React.useState<string>("");
  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent<typeof filterValue>) => {
    const {
      target: { value },
    } = event;
    setFilterValue(value);
    const filterObject = createFilterObject(value);
    dispatch(setFilter(filterObject));
  };

  return (
    <div style={{ margin: "1px 15px 1px 1px" }}>
      <FormControl sx={{ m: 1, width: 200, height: "50px" }}>
        <InputLabel id="demo-multiple-chip-label" sx={{ height: "50px" }}>
          Filter
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          value={filterValue}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Filter" />}
          renderValue={(selected) => <Chip key={selected} label={selected} />}
        >
          {options.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Filter;
