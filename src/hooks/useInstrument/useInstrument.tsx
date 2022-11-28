import { useAvanza } from "../useAvanza";
import { useCache } from "../useCache";
import { InstrumentResponse, InstrumentType } from "avanza-ts";

export function useInstrument(instrumentType: InstrumentType, id: string) {
  const { client } = useAvanza();

  const data = useCache<InstrumentResponse>(
    () => {
      return client.market.getInstrument(instrumentType, id);
    },
    `AVANZA_INSTRUMENT_${instrumentType}_${id}`,
    {}
  );
  return data;
}
