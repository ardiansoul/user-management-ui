import { Box, Container, Grid } from "@mui/material";
import "./App.css";
import DataTable from "./components/data-table";
import Header from "./components/header";
import { useQuery } from "@tanstack/react-query";
import { useDeferredValue, useState } from "react";
import query from "./constants/query";
import type User from "./interface/user";
import UserService from "./services/users";
import type Pagination from "./interface/pagination";

function App() {
  const [pagination, setPagination] = useState<Pagination>({
    page: 0,
    pageSize: 5,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  const deferredSearchTerm = useDeferredValue(searchTerm);

  const { data, isLoading, refetch } = useQuery<{
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

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    refetch();
  };

  const handlePagination = (pagination: Pagination) => {
    setPagination(pagination);
    refetch();
  };

  return (
    <Box width={"100vw"} height={"100vh"} overflow={"hidden"}>
      <Grid container spacing={2} padding={4}>
        <Container>
          <Header handleSearch={handleSearch} />
          <DataTable
            data={data}
            isLoading={isLoading}
            pagination={pagination}
            handlePagination={handlePagination}
          />
        </Container>
      </Grid>
    </Box>
  );
}

export default App;
