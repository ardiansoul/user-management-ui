import { Box, Button, InputBase, styled } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import useModal from "../../hooks/useModal";

const StyledSearch = styled(InputBase)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  padding: "0 8px",
  borderRadius: theme.shape.borderRadius,
  width: "300px",
}));

interface HeaderProps {
  handleSearch: (searchTerm: string) => void;
}

export default function Header({ handleSearch }: HeaderProps) {
  const { handleModal } = useModal();

  return (
    <>
      <Box display={"flex"} paddingBottom={4} justifyContent={"space-between"}>
        <h1>User Management</h1>
        <StyledSearch
          name="search"
          placeholder="Search..."
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Box>
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={() => handleModal(true)}
          >
            Create User
          </Button>
        </Box>
      </Box>
    </>
  );
}
