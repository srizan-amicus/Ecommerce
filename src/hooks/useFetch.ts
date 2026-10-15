import { useCallback, useEffect, useRef, useState } from "react";

interface UseFetchOptions {
  immediate?: boolean;
}

interface ExecuteOptions {
  silent?: boolean;
}

type FetchFunction<T> = (signal: AbortSignal) => Promise<T>;

function useFetch<T>(
  fetchFunction: FetchFunction<T>,
  options: UseFetchOptions = {},
) {
  const { immediate = true } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const fetchFunctionRef = useRef(fetchFunction);
  const mountedRef = useRef(false);

  // Keep the latest request function available to execute().
  useEffect(() => {
    fetchFunctionRef.current = fetchFunction;
  }, [fetchFunction]);

  const execute = useCallback(
    async (
      request?: FetchFunction<T>,
      executeOptions: ExecuteOptions = {},
    ): Promise<boolean> => {
      const { silent = false } = executeOptions;

      abortControllerRef.current?.abort();

      const controller = new AbortController();
      abortControllerRef.current = controller;

      if (!silent) {
        setLoading(true);
      }

      setError(null);

      try {
        const currentRequest = request ?? fetchFunctionRef.current;
        const result = await currentRequest(controller.signal);

        if (controller.signal.aborted) {
          return false;
        }

        setData(result);
        return true;
      } catch (error) {
        if (controller.signal.aborted) {
          return false;
        }

        console.error("Fetch error:", error);
        setError("Could not load data. Please try again.");
        return false;
      } finally {
        if (
          !controller.signal.aborted &&
          abortControllerRef.current === controller
        ) {
          abortControllerRef.current = null;

          if (!silent) {
            setLoading(false);
          }
        }
      }
    },
    [],
  );

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      abortControllerRef.current?.abort();
      abortControllerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!immediate) {
      return;
    }

    const controller = new AbortController();
    abortControllerRef.current?.abort();
    abortControllerRef.current = controller;

    fetchFunction(controller.signal)
      .then((result) => {
        if (controller.signal.aborted) {
          return;
        }

        setData(result);
        setError(null);
      })
      .catch((error) => {
        if (controller.signal.aborted) {
          return;
        }

        console.error("Fetch error:", error);
        setError("Could not load data. Please try again.");
      })
      .finally(() => {
        if (
          !controller.signal.aborted &&
          abortControllerRef.current === controller
        ) {
          abortControllerRef.current = null;
          setLoading(false);
        }
      });

    return () => {
      controller.abort();

      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
    };
  }, [fetchFunction, immediate]);

  return {
    data,
    loading,
    error,
    execute,
    setData,
  };
}

export default useFetch;
