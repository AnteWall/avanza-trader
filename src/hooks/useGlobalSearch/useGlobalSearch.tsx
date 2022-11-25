import { useAvanza } from "../useAvanza";
import { useCache } from "../useCache";
import { SearchResponse } from "avanza-ts";

export function useGlobalSearch(query: string) {
  const { client } = useAvanza();

  const data = useCache<SearchResponse>(
    () => {
      return client.market.search(query);
    },
    `AVANZA_QUERY_${query}`,
    {}
  );
  return data;
}
