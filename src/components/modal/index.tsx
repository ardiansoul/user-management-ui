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

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title = "Modal Title",
  size = "md",
}: ModalProps) {
  // Handle escape key press to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
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
  }, [isOpen, onClose]);

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
        onClick={onClose}
      >
        <Dialog
          open={isOpen}
          onClose={onClose}
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
              onClick={onClose}
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
