import { useCallback, useEffect, useRef, useState } from "react";

function getMaxPrice(products) {
  if (!Array.isArray(products) || products.length === 0) return 3000;

  return Math.ceil(
    products.reduce(
      (max, product) => Math.max(max, Number(product.price) || 0),
      0
    )
  );
}

const fetchCache = new Map();
const CACHED_DURATION = 3 * 60 * 1000; // 3 minutes

export function useFetch(url) {
  const [state, setState] = useState({
    data: null,
    error: null,
    loading: true,
    retry: () => {},
  });

  const retryCountRef = useRef(0);

  const fetchData = useCallback(async () => {
    /*Checking the cache data first so that 
    no request is to be made again if present */

    const cached = fetchCache.get(url);

    if (cached && Date.now() - cached.timestamp < CACHED_DURATION) {
      setState({
        data: cached.data,
        error: null,
        loading: false,
        retry: () => {
          retryCountRef.current = 0;
          fetchData();
        },
      });
      return;
    }

    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Cache the successful response
      fetchCache.set(url, {
        data: {
          ...data,
          ...(data?.products && { maxPriceValue: getMaxPrice(data?.products) }),
        },
        timestamp: Date.now(),
      });

      setState({
        data: {
          ...data,
          ...(data?.products && { maxPriceValue: getMaxPrice(data?.products) }),
        },
        error: null,
        loading: false,
        retry: () => {
          retryCountRef.current = 0;
          fetchData();
        },
      });

      retryCountRef.current = 0;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");

      // Retry logic: retry up to 3 times
      if (retryCountRef.current < 3) {
        retryCountRef.current++;
        setTimeout(fetchData, 1000);
      } else {
        setState({
          data: null,
          error,
          loading: false,
          retry: () => {
            retryCountRef.current = 0;
            fetchData();
          },
        });
      }
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [url, fetchData]);

  return state;
}
