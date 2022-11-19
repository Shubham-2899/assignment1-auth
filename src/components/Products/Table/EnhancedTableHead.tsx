import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Title",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "category",
    numeric: true,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "rating",
    numeric: true,
    disablePadding: false,
    label: "Rating",
  },
  {
    id: "stock",
    numeric: true,
    disablePadding: false,
    label: "Stock",
  },
];

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead sx={{ marginTop: "100px", marginLeft: "200px" }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
