const BASE_URL = "https://countriesnow.space/api/v0.1";

interface Country {
  country: string;
  iso2: string;
  iso3: string;
  cities: string[];
}

interface State {
  name: string;
  state_code?: string;
}

export async function fetchCountries(): Promise<Country[]> {
  const response = await fetch(`${BASE_URL}/countries`);

  if (!response.ok) {
    throw new Error("Could not load countries.");
  }

  const data = await response.json();

  return data.data;
}

export async function fetchStates(
  country: string,
): Promise<State[]> {
  const response = await fetch(`${BASE_URL}/countries/states`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ country }),
  });

  if (!response.ok) {
    throw new Error("Could not load states.");
  }

  const data = await response.json();

  return data.data.states;
}

export async function fetchCities(
  country: string,
  state: string,
): Promise<string[]> {
  const response = await fetch(
    `${BASE_URL}/countries/state/cities`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country,
        state,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Could not load cities.");
  }

  const data = await response.json();

  return data.data;
}