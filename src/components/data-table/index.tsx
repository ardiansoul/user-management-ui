import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, TablePagination } from "@mui/material";
import type User from "../../interface/user";
import type Pagination from "../../interface/pagination";
import spinner from "../../assets/spinner.svg";

interface DataTableProps {
  data: { data: User[]; count: number };
  isLoading: boolean;
  pagination: Pagination;
  handlePagination: (pagination: Pagination) => void;
  onHandleAction: (type: "add" | "edit" | "delete", id?: string) => void;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function DataTable({
  data,
  isLoading,
  pagination,
  handlePagination,
  onHandleAction,
}: DataTableProps) {
  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: "70vh" }}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Company</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          {isLoading && (
            <TableBody sx={{ height: "60vh" }}>
              <TableRow>
                <TableCell colSpan={5}>
                  <Box
                    height={"100%"}
                    p={2}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    width="100%"
                  >
                    <img src={spinner} />
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          {!isLoading && !data.data.length && (
            <TableBody sx={{ height: "60vh" }}>
              <TableRow>
                <TableCell colSpan={5}>
                  <Box
                    height={"100%"}
                    p={2}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    width="100%"
                  >
                    No data available
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          {!isLoading && data.data.length > 0 && (
            <TableBody>
              {data.data.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                  <StyledTableCell>{row.company.name}</StyledTableCell>
                  <StyledTableCell sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onHandleAction("edit", row.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => onHandleAction("delete", row.id)}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="flex-end" pt={2}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          colSpan={3}
          count={Number(data.count)}
          rowsPerPage={pagination.pageSize}
          page={pagination.page}
          slotProps={{
            select: {
              inputProps: {
                "aria-label": "rows per page",
              },
              native: true,
            },
          }}
          onPageChange={(_, page) =>
            handlePagination({ ...pagination, page: page || 0 })
          }
          onRowsPerPageChange={(e) =>
            handlePagination({
              ...pagination,
              pageSize: parseInt(e.target.value, 10),
            })
          }
        />
      </Box>
    </>
  );
}
