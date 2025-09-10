import { useContext } from "react";
import { modalContext } from "../contexts/modal";

export default function useModal() {
  const { isOpen, handleModal } = useContext(modalContext);
  return { isOpen, handleModal };
}
