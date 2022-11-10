import { styled, TablePagination } from "@mui/material";

export const StyledTablePagination = styled(TablePagination)`
  & .MuiTablePagination-toolbar {
    padding-left: 4px;
    padding-right: 0px;
  }
  & .MuiTablePagination-actions {
    margin-left: 5px !important;
  }
`;
