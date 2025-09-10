import { useState } from "react";

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = (isOpen?: boolean) => {
    setIsOpen(isOpen ?? !isOpen);
  };

  return { isOpen, handleModal };
}
