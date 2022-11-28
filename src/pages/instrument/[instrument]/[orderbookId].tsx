import { InstrumentType } from "avanza-ts";
import { useRouter } from "next/router";
import React from "react";
import Navigation from "../../../components/Navigation";
import { useInstrument } from "../../../hooks/useInstrument";

const OrderBookPage = () => {
  const { query } = useRouter();

  const instrument = query.instrument as InstrumentType;
  const { data, isFetching, error } = useInstrument(
    instrument,
    query.orderbookId as string
  );
  console.log(data, isFetching, error);
  return (
    <Navigation
      title={data?.name as string}
      breadcrumbs={[
        { title: "Instruments" },
        { title: instrument },
        { title: data?.name as string },
      ]}
    >
      [orderbookId]: {query.orderbookId}
      instrument: {query.instrument}
    </Navigation>
  );
};

export default OrderBookPage;
