import { useState } from "react";
import { SortBy, SortOrder } from "../enums/sort";

function useProductFilters() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [draftCategory, setDraftCategory] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [draftBrand, setDraftBrand] = useState<number | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [draftPriceRange, setDraftPriceRange] = useState("");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [draftRating, setDraftRating] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Asc);
  const toggleCategory = (categoryId: number, isMobile = false) => {
    const setter = isMobile ? setDraftCategory : setSelectedCategory;

    setter((current) => (current === categoryId ? null : categoryId));
  };

  const toggleBrand = (brandId: number, isMobile = false) => {
    const setter = isMobile ? setDraftBrand : setSelectedBrand;

    setter((current) => (current === brandId ? null : brandId));
  };

  const toggleFilters = () => {
    if (isFilterOpen) {
      setIsFilterOpen(false);
      return;
    }

    setDraftCategory(selectedCategory);
    setDraftBrand(selectedBrand);
    setDraftPriceRange(selectedPriceRange);
    setDraftRating(selectedRating);

    setIsFilterOpen(true);
  };

  const applyFilters = () => {
    setSelectedCategory(draftCategory);
    setSelectedBrand(draftBrand);
    setSelectedPriceRange(draftPriceRange);
    setSelectedRating(draftRating);

    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setDraftCategory(null);

    setSelectedBrand(null);
    setDraftBrand(null);

    setSelectedPriceRange("");
    setDraftPriceRange("");

    setSelectedRating(null);
    setDraftRating(null);
  };

  return {
    selectedCategory,
    draftCategory,

    selectedBrand,
    draftBrand,

    selectedPriceRange,
    draftPriceRange,

    selectedRating,
    draftRating,

    isFilterOpen,
    sortBy,
    sortOrder,

    toggleCategory,
    toggleBrand,

    toggleFilters,
    applyFilters,
    clearFilters,

    setSelectedCategory,
    setSelectedBrand,

    setSelectedPriceRange,
    setDraftPriceRange,

    setSelectedRating,
    setDraftRating,

    setSortBy,
    setSortOrder,
  };
}

export default useProductFilters;
