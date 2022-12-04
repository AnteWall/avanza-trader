import { useState, useCallback, useMemo } from "react";
import { useAsync } from "react-async-hook";
const CACHES: {
  [key: string]: Promise<any>;
} = {};

type DataKey = string | (() => string);

export type UseCacheResponse<T> = {
  isFetching: boolean;
  data: T | null | undefined;
  error?: Error;
  updateCache: (nextData: T) => void;
  removeCache: () => void;
  refetch: () => void;
};

export type UseCachecOptions = {
  onError?:
    | ((
        e: Error,
        options: {
          isCurrent: () => boolean;
        }
      ) => void)
    | undefined;
};

export function useCache<T>(
  getData: () => Promise<T>,
  dataKey: DataKey,
  opts: UseCachecOptions = {}
): UseCacheResponse<T> {
  const [count, setCount] = useState<number>(0);

  const key = useMemo(() => {
    if (typeof dataKey === "string") {
      return dataKey;
    }

    return dataKey();
  }, [dataKey]);

  const updateCache = useCallback(
    (nextData: T) => {
      CACHES[key] = Promise.resolve(nextData);
      setCount(Date.now());
    },
    [key]
  );

  const removeCache = useCallback(() => {
    delete CACHES[key];
    setCount(Date.now());
  }, [key]);

  const retrieveData = useCallback(() => {
    let cachedPromise = CACHES[key];
    if (cachedPromise === undefined) {
      const data = getData();
      cachedPromise = CACHES[key] = data;
    }
    return cachedPromise;
  }, [key, count]);

  const { result, loading, error, execute } = useAsync(retrieveData, [key], {
    onError: opts.onError,
  });
  return {
    isFetching: loading,
    data: result,
    error,
    updateCache,
    removeCache,
    refetch: execute,
  };
}
