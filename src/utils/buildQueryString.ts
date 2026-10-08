export type QueryValue = string | number | boolean | undefined | null;

export function buildQueryString<T extends object>(
  params: T,
  keyMap: Partial<Record<keyof T, string>> = {},
): string {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    const queryKey = keyMap[key as keyof T] ?? key;

    queryParams.append(queryKey, String(value));
  });

  return queryParams.toString();
}
