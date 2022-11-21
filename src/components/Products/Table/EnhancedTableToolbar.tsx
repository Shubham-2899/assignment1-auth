import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import React from "react";
import { alpha } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { IProducts } from "../../../Interfaces";
import { setDeletedProductIds } from "../../../redux/features/productsSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";

interface EnhancedTableToolbarProps {
  numSelected: number;
  selectedProducts: number[];
  setSelectedId: React.Dispatch<React.SetStateAction<number[]>>;
  data: IProducts[];
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const dispatch = useAppDispatch();
  const { numSelected, selectedProducts, setSelectedId } = props;

  const deleteHandler = async () => {
    const confirmAction = window.confirm(
      "Are you sure about deleting selected products ?"
    );
    if (confirmAction) {
      // const filteredData = deleteSelectedProducts(data, selectedProducts);
      toast.success("Products deleted successfully", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
      dispatch(setDeletedProductIds(selectedProducts));
      setSelectedId([]);
    }
    setSelectedId([]);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Products
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={deleteHandler}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
      <ToastContainer />
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
