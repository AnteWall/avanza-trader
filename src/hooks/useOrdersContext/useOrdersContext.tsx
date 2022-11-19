import { useContext } from "react";
import { OrdersContext } from "../../context/OrdersContext";

export function useOrdersContext() {
  const context = useContext(OrdersContext);
  return context;
}
