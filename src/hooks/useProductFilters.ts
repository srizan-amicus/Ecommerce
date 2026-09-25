import { useState } from "react";
import { SortBy, SortOrder } from "../enums/sort";

function useProductFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    [],
  );

  const [draftCategories, setDraftCategories] = useState<string[]>([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [sortBy, setSortBy] = useState<SortBy | null>(null);

  const [sortOrder, setSortOrder] = useState<SortOrder>(
    SortOrder.Asc,
  );

  const toggleCategory = (
    category: string,
    isMobile = false,
  ) => {
    const setter = isMobile
      ? setDraftCategories
      : setSelectedCategories;

    setter((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  };

  const toggleFilters = () => {
    if (isFilterOpen) {
      setIsFilterOpen(false);
      return;
    }

    setDraftCategories(selectedCategories);
    setIsFilterOpen(true);
  };

  const applyFilters = () => {
    setSelectedCategories(draftCategories);
    setIsFilterOpen(false);
  };

  const clearCategories = () => {
    setSelectedCategories([]);
  };

  return {
    selectedCategories,
    draftCategories,
    isFilterOpen,
    sortBy,
    sortOrder,

    toggleCategory,
    toggleFilters,
    applyFilters,
    clearCategories,

    setSortBy,
    setSortOrder,
  };
}

export default useProductFilters;