import { useContext } from "react";
import { AvanzaContext } from "../../context/AvanzaContext";

export function useAvanza() {
  const context = useContext(AvanzaContext);
  return context;
}
