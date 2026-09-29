import { useEffect, useState } from "react";
import { fetchCities, fetchCountries, fetchStates } from "../api/countriesApi";

function useLocationOptions() {
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    const loadCountries = async () => {
      setLoadingCountries(true);

      try {
        const data = await fetchCountries();

        setCountries(
          data.map((country: { country: string }) => country.country),
        );
      } catch {
        setCountries([]);
      } finally {
        setLoadingCountries(false);
      }
    };

    loadCountries();
  }, []);

  const loadStates = async (country: string) => {
    setStates([]);
    setCities([]);

    if (!country) {
      return;
    }

    setLoadingStates(true);

    try {
      const data = await fetchStates(country);

      setStates(
        data.map((state: string | { name: string }) =>
          typeof state === "string" ? state : state.name,
        ),
      );
    } catch {
      setStates([]);
    } finally {
      setLoadingStates(false);
    }
  };

  const loadCities = async (country: string, state: string) => {
    setCities([]);

    if (!country || !state) {
      return;
    }

    setLoadingCities(true);

    try {
      const data = await fetchCities(country, state);

      setCities(
        data.map((city: string | { name: string }) =>
          typeof city === "string" ? city : city.name,
        ),
      );
    } catch {
      setCities([]);
    } finally {
      setLoadingCities(false);
    }
  };

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
