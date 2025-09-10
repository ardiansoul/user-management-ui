import { Box, Button, capitalize, Container, Grid } from "@mui/material";
import "./App.css";
import DataTable from "./components/data-table";
import Header from "./components/header";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDeferredValue, useState } from "react";
import query from "./constants/query";
import type User from "./interface/user";
import UserService from "./services/users";
import type Pagination from "./interface/pagination";
import Modal from "./components/modal";
import UserForm from "./components/user-form";
import useModal from "./hooks/useModal";
import useAlert from "./hooks/useAlert";

function App() {
  const [pagination, setPagination] = useState<Pagination>({
    page: 0,
    pageSize: 5,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  const deferredSearchTerm = useDeferredValue(searchTerm);

  const { data, isFetching, refetch } = useQuery<{
    data: User[];
    count: number;
  }>({
    queryKey: [query.USERS, deferredSearchTerm, pagination],
    queryFn: async ({ signal }) => {
      return UserService.getUsers(signal, deferredSearchTerm, pagination);
    },
    initialData: {
      data: [],
      count: pagination.pageSize,
    },
  });

  console.log("isloading", isFetching);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    refetch();
  };

  const handlePagination = (pagination: Pagination) => {
    setPagination(pagination);
    refetch();
  };

  const { handleModal } = useModal();
  const { handleAlert } = useAlert();
  const queryClient = useQueryClient();

  const [action_type, setActionType] = useState<"add" | "edit" | "delete">(
    "add"
  );

  const mutation = useMutation({
    mutationKey: ["user", "delete"],
    mutationFn: (id: string) => UserService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries();
      handleModal(false);
      handleAlert("success", "User deleted successfully");
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
      <Modal title={`${capitalize(action_type)} User`}>
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
      <Box width={"100vw"} height={"100vh"} overflow={"hidden"}>
        <Grid container spacing={2} padding={4}>
          <Container>
            <Header handleSearch={handleSearch} />
            <DataTable
              data={data}
              isLoading={isFetching}
              pagination={pagination}
              handlePagination={handlePagination}
              onHandleAction={onHandleAction}
            />
          </Container>
        </Grid>
      </Box>
    </>
  );
}

export default App;
