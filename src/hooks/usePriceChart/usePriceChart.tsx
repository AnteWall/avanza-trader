import { useAvanza } from "../useAvanza";
import { useCache } from "../useCache";
import {
  InstrumentType,
  PriceChartResolution,
  PriceChartResponse,
  PriceChartTimePeriod,
} from "avanza-ts";

export interface PriceChartOptions {
  timePeriod?: PriceChartTimePeriod;
  resolution?: PriceChartResolution;
}

export function usePriceChart(
  instrumentType: InstrumentType,
  id: string,
  options?: PriceChartOptions
) {
  const { client } = useAvanza();

  const timePeriod = options?.timePeriod ?? PriceChartTimePeriod.ONE_MONTH;
  const resolution = options?.resolution ?? PriceChartResolution.DAY;

  const data = useCache<PriceChartResponse>(
    () => {
      return client.priceChart.getPriceChart(
        instrumentType,
        id,
        timePeriod,
        resolution
      );
    },
    `AVANZA_PRICE_CHART_${instrumentType}_${id}_${timePeriod}_${resolution}`,
    {}
  );
  return data;
}
