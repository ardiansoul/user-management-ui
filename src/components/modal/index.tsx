import {
  Box,
  Portal,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useEffect } from "react";
import useModal from "../../hooks/useModal";

interface ModalProps {
  children: React.ReactNode;
  title?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function Modal({ children, title, size = "md" }: ModalProps) {
  const { isOpen, handleModal } = useModal();
  // Handle escape key press to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleModal(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleModal]);

  if (!isOpen) return null;

  return (
    <Portal container={document.getElementById("modal")}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1300,
          p: 2,
        }}
        onClick={() => handleModal(false)}
      >
        <Dialog
          open={isOpen}
          onClose={() => handleModal(false)}
          maxWidth={size}
          onClick={(e) => e.stopPropagation()}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 1,
            }}
          >
            {title}
            <IconButton
              onClick={() => handleModal(false)}
              sx={{ color: "text.secondary" }}
              aria-label="close"
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>{children}</DialogContent>
        </Dialog>
      </Box>
    </Portal>
  );
}
