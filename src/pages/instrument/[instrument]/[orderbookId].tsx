import { useRouter } from "next/router";
import React from "react";

const OrderBookPage = () => {
  const { query } = useRouter();

  return (
    <div>
      [orderbookId]: {query.orderbookId}
      instrument: {query.instrument}
    </div>
  );
};

export default OrderBookPage;
