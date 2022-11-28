import { useAvanza } from "../useAvanza";
import { useCache } from "../useCache";
import { InstrumentDetailsResponse, InstrumentType } from "avanza-ts";

export function useInstrumentDetails(
  instrumentType: InstrumentType,
  id: string
) {
  const { client } = useAvanza();

  const data = useCache<InstrumentDetailsResponse>(
    () => {
      return client.market.getInstrumentDetails(instrumentType, id);
    },
    `AVANZA_INSTRUMENT_DETAILS_${instrumentType}_${id}`,
    {}
  );
  return data;
}
