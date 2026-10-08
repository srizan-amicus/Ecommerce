import { useCallback, useMemo } from "react";
import { fetchCities, fetchCountries, fetchStates } from "../api/countriesApi";
import useFetch from "./useFetch";

interface Country {
  country: string;
}

interface State {
  name: string;
}

function useLocationOptions() {
  const emptyStatesRequest = useCallback(async () => [], []);

  const emptyCitiesRequest = useCallback(async () => [], []);

  const { data: countriesData, loading: loadingCountries } =
    useFetch<Country[]>(fetchCountries);

  const {
    data: statesData,
    loading: loadingStates,
    execute: executeStates,
    setData: setStates,
  } = useFetch<State[]>(emptyStatesRequest, {
    immediate: false,
  });

  const {
    data: citiesData,
    loading: loadingCities,
    execute: executeCities,
    setData: setCities,
  } = useFetch<string[]>(emptyCitiesRequest, {
    immediate: false,
  });

  const loadStates = useCallback(
    async (country: string) => {
      if (!country) {
        setStates([]);
        setCities([]);
        return;
      }

      await executeStates((signal) => fetchStates(country, signal));

      setCities([]);
    },
    [executeStates, setStates, setCities],
  );

  const loadCities = useCallback(
    async (country: string, state: string) => {
      if (!country || !state) {
        setCities([]);
        return;
      }

      await executeCities((signal) => fetchCities(country, state, signal));
    },
    [executeCities, setCities],
  );

  const countries = useMemo(
    () => countriesData?.map((country) => country.country) ?? [],
    [countriesData],
  );

  const states = useMemo(
    () => statesData?.map((state) => state.name) ?? [],
    [statesData],
  );

  const cities = useMemo(() => citiesData ?? [], [citiesData]);

  return {
    countries,
    states,
    cities,

    loadingCountries,
    loadingStates,
    loadingCities,

    loadStates,
    loadCities,

    setStates,
    setCities,
  };
}

export default useLocationOptions;
