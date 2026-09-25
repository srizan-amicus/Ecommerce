export const SortBy = {
  Name: "name",
  Price: "price",
  Rating: "rating",
} as const;

export type SortBy = (typeof SortBy)[keyof typeof SortBy];

export const SortOrder = {
  Asc: "asc",
  Desc: "desc",
} as const;

export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
