import { createContext, useState, type PropsWithChildren } from "react";

type AlertContextType = {
  isShowed: boolean;
  handleAlert: (type: AlertType, message: string) => void;
  message: string;
  type: AlertType;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AlertContext = createContext<AlertContextType>({
  isShowed: false,
  handleAlert: () => {},
  message: "",
  type: "info",
});

type AlertType = "success" | "error" | "info" | "warning";

export function AlertProvider({ children }: PropsWithChildren) {
  const [isShowed, setIsShowed] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<AlertType>("info");

  const handleAlert = (type: AlertType, message: string) => {
    setIsShowed(true);
    setType(type);
    setMessage(message);

    setTimeout(() => {
      setIsShowed(false);
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ isShowed, handleAlert, message, type }}>
      {children}
    </AlertContext.Provider>
  );
}
