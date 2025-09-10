import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, capitalize, TablePagination } from "@mui/material";
import type User from "../../interface/user";
import type Pagination from "../../interface/pagination";
import useModal from "../../hooks/useModal";
import UserForm from "../user-form";
import Modal from "../modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserService from "../../services/users";

interface DataTableProps {
  data: { data: User[]; count: number };
  isLoading: boolean;
  pagination: Pagination;
  handlePagination: (pagination: Pagination) => void;
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
}: DataTableProps) {
  const queryClient = useQueryClient();
  const { isOpen, handleModal } = useModal();

  const [action_type, setActionType] = useState<"add" | "edit" | "delete">(
    "add"
  );

  const mutation = useMutation({
    mutationKey: ["user", "delete"],
    mutationFn: (id: string) => UserService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const onHandleAction = (type: "add" | "edit" | "delete", id?: string) => {
    setActionType(type);
    if (id) {
      const user = data.data.find((user) => user.id === id) || null;
      setSelectedUser(user);
    } else {
      setSelectedUser(null);
    }
    handleModal(true);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => handleModal(false)}
        title={`${capitalize(action_type)} User`}
      >
        {action_type === "add" && <UserForm />}
        {action_type === "edit" && <UserForm data={selectedUser!} />}
        {action_type === "delete" && (
          <Box>
            <p>Are you sure you want to delete this user?</p>
            <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
              <Button
                variant="contained"
                color="error"
                onClick={() => mutation.mutate(selectedUser!.id)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        )}
      </Modal>
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
          <TableBody>
            {!data.data.length && (
              <StyledTableRow>
                <StyledTableCell colSpan={4} align="center">
                  No data available
                </StyledTableCell>
              </StyledTableRow>
            )}
            {isLoading && (
              <StyledTableRow>
                <StyledTableCell colSpan={4} align="center">
                  Loading...
                </StyledTableCell>
              </StyledTableRow>
            )}
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
            handlePagination({ ...pagination, page: page || 1 })
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
