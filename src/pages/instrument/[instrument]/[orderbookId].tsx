import { Grid } from "@mantine/core";
import { InstrumentType } from "avanza-ts";
import { useRouter } from "next/router";
import React from "react";
import InstrumentInfo from "../../../components/InstrumentInfo";
import Navigation from "../../../components/Navigation";
import OrderDepth from "../../../components/OrderDepth";
import { useInstrument } from "../../../hooks/useInstrument";
import { useInstrumentDetails } from "../../../hooks/useInstrumentDetails";

const OrderBookPage = () => {
  const { query } = useRouter();

  const instrument = query.instrument as InstrumentType;
  const { data, isFetching, error } = useInstrument(
    instrument,
    query.orderbookId as string
  );
  const {
    data: instrumentDetails,
    isFetching: isFetchingInstrumentDetails,
    error: errorInstrumentDetails,
  } = useInstrumentDetails(instrument, query.orderbookId as string);
  console.log(data, isFetching, error);
  console.log(
    instrumentDetails,
    isFetchingInstrumentDetails,
    errorInstrumentDetails
  );
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
      <Grid>
        <Grid.Col span={8}>
          <InstrumentInfo
            details={instrumentDetails}
            loading={isFetchingInstrumentDetails}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <OrderDepth orderDepth={instrumentDetails?.orderDepthLevels} />
        </Grid.Col>
      </Grid>
    </Navigation>
  );
};

export default OrderBookPage;
