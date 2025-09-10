import { Box, Button, InputBase } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import useModal from "../../hooks/useModal";
import UserForm from "../user-form";
import Modal from "../modal";

interface HeaderProps {
  handleSearch: (searchTerm: string) => void;
}

export default function Header({ handleSearch }: HeaderProps) {
  const { isOpen, handleModal } = useModal();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => handleModal(false)}
        title="Add User"
      >
        <UserForm />
      </Modal>
      <Box display={"flex"} paddingBottom={4} justifyContent={"space-between"}>
        <h1>User Management</h1>
        <InputBase
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
