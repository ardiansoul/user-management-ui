import { useContext } from "react";
import { AlertContext } from "../contexts/alert";
export default function useAlert() {
  const { isShowed, handleAlert, message, type } = useContext(AlertContext);
  return { isShowed, handleAlert, message, type };
}
