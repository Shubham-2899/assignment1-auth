import * as React from "react";
import MuiTableContainer from "@mui/material/TableContainer";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import Loading from "../Loading";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import "./mtable-styles.scss";
import { StyledTableCell } from "../styled-components/table/StyledTableCell";
import { StyledTableRow } from "../styled-components/table/StyledTableRow";
import { StyledTablePagination } from "../styled-components/table/StyledTablePagination";

export default function Mtable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const navigate = useNavigate();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    let authToken = sessionStorage.getItem("UserEmail");
    // console.log(authToken);
    if (!authToken) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { content, isLoading } = useFetch(`https://fakestoreapi.com/products`);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="outerTableContainer">
            <Typography variant="h3">Products</Typography>
            <MuiTableContainer component={Paper} className="root">
              <Table className="tableRoot" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Product Id</StyledTableCell>
                    <StyledTableCell align="left">Title</StyledTableCell>
                    <StyledTableCell align="right">Price</StyledTableCell>
                    <StyledTableCell align="right">Rating</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {content.length
                    ? content
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((product) => (
                          <StyledTableRow key={product.id}>
                            <StyledTableCell component="th" scope="row">
                              {product.id}
                            </StyledTableCell>
                            <Tooltip title={product.title}>
                              <StyledTableCell
                                align="left"
                                className="addEllipses"
                              >
                                {product.title}
                              </StyledTableCell>
                            </Tooltip>
                            <StyledTableCell align="right">
                              ${product.price}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {product.rating.rate}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))
                    : null}
                  <tr>
                    <StyledTablePagination
                      rowsPerPageOptions={[5, 10, 15]}
                      count={content.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </tr>
                </TableBody>
              </Table>
            </MuiTableContainer>
          </div>
        </>
      )}
    </>
  );
}
