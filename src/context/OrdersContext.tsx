import { createContext, useMemo, useState } from "react";
import OrderDrawer from "../components/OrderDrawer";

interface OrdersContextData {
  openPlaceOrder(securityId: string): void;
}

interface OrdersContextProps {
  children: React.ReactNode;
}

export const OrdersContext = createContext<OrdersContextData>({
  openPlaceOrder: (securityId: string) => {
    throw new Error(
      "OrdersContext not initialized, please wrap your app with OrdersProvider"
    );
  },
});

export const OrdersProvider: React.FC<OrdersContextProps> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newOrderSecurityId, setNewOrderSecurityId] = useState<
    string | undefined
  >();

  const onClose = () => {
    setDrawerOpen(false);
  };

  const value = useMemo(() => {
    return {
      openPlaceOrder: (securityId: string) => {
        setNewOrderSecurityId(securityId);
        setDrawerOpen(true);
      },
    };
  }, []);

  return (
    <OrdersContext.Provider value={value}>
      {children}
      <OrderDrawer
        opened={drawerOpen}
        onClose={onClose}
        securityId={newOrderSecurityId!}
      />
    </OrdersContext.Provider>
  );
};
