import { createContext, useState, type PropsWithChildren } from "react";

type ModalContextType = {
  isOpen: boolean;
  handleModal: (open: boolean) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const modalContext = createContext<ModalContextType>({
  isOpen: false,
  handleModal: () => {},
});

export function ModalProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <modalContext.Provider value={{ isOpen, handleModal }}>
      {children}
    </modalContext.Provider>
  );
}
