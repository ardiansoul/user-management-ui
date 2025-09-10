import { Box, Alert } from "@mui/material";
import useAlert from "../../hooks/useAlert";

export default function CustomAlert() {
  const { message, type, isShowed } = useAlert();
  return (
    <Box
      position={"fixed"}
      display={isShowed ? "block" : "none"}
      top={16}
      right={16}
      zIndex={1300}
    >
      <Alert severity={type} onClose={() => {}}>
        {message}
      </Alert>
    </Box>
  );
}
