import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "./contexts/modal.tsx";
import { AlertProvider } from "./contexts/alert.tsx";
import CustomAlert from "./components/alert/index.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <AlertProvider>
          <CustomAlert />
          <App />
        </AlertProvider>
      </ModalProvider>
    </QueryClientProvider>
  </StrictMode>
);
