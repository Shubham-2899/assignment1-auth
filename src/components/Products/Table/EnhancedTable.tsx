import * as React from "react";
import Box from "@mui/material/Box";
import {
  Table,
  TableBody,
  TableRow,
  Paper,
  TableCell,
  TableContainer,
  TablePagination,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { IProducts } from "../../../Interfaces";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { deleteSelectedProducts } from "../../../helpers/ProductsPageHelpers";

type Props = {
  data: IProducts[];
};

export default function EnhancedTable({ data }: Props) {
  const { deletedOwnProducts } = useAppSelector((state) => state.products);
  const [selectedId, setSelectedId] = React.useState<number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const filteredData =
    deletedOwnProducts.length > 0
      ? deleteSelectedProducts(data, deletedOwnProducts)
      : data;

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      console.log("inside handleAllClick's if");
      const newSelected = data.map((n) => n.id);
      setSelectedId(newSelected);
      return;
    }
    setSelectedId([]);
  };

  const handleClick = (
    event: React.MouseEvent<unknown>,
    name: string,
    id: number
  ) => {
    const selectedIndex = selectedId.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedId, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedId.slice(1));
    } else if (selectedIndex === selectedId.length - 1) {
      newSelected = newSelected.concat(selectedId.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedId.slice(0, selectedIndex),
        selectedId.slice(selectedIndex + 1)
      );
    }

    setSelectedId(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selectedId.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box sx={{ width: "100%", narginTop: "100px" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selectedId.length}
          selectedProducts={selectedId}
          setSelectedId={setSelectedId}
          data={data}
        />
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selectedId.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={filteredData.length}
            />
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.title, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.title}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.title}
                      </TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right" sx={{ p: "0px" }}>
                        {row.category}
                      </TableCell>
                      <TableCell align="right">{row.rating}</TableCell>
                      <TableCell align="right">{row.stock}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
