import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { Recipe } from "../types/recipe";
import { useDebounce } from "./useDebounce";
import { usePagination } from "./usePagination";

interface Filters {
  search: string;
  category: string;
  area: string;
}

type FilterKey = keyof Filters;

interface UseRecipeFiltersReturn {
  filters: Filters;
  updateFilters: (updates: Partial<Filters>) => void;
  categories: string[];
  areas: string[];
  isLoading: boolean;
  isError: boolean;
  paginatedRecipes: Recipe[];
  pagination: {
    currentPage: number;
    visiblePages: (number | string)[];
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    onPageChange: (page: number) => void;
    onNextPage: () => void;
    onPreviousPage: () => void;
  };
}

const ITEMS_PER_PAGE = 9;

export function useRecipeFilters(): UseRecipeFiltersReturn {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: Filters = {
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    area: searchParams.get("area") || "",
  };

  const debouncedSearch = useDebounce(filters.search, 500);

  const updateFilters = (updates: Partial<Filters>) => {
    const newSearchParams = new URLSearchParams(searchParams);

    (Object.keys(updates) as FilterKey[]).forEach((key) => {
      const value = updates[key];
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });

    const filterKeys = Object.keys(filters) as FilterKey[];
    const updatedKey = Object.keys(updates)[0] as FilterKey;

    if (updatedKey && updates[updatedKey]) {
      filterKeys
        .filter((key) => key !== updatedKey)
        .forEach((key) => newSearchParams.delete(key));
    }

    newSearchParams.delete("page");
    setSearchParams(newSearchParams);
  };

  const {
    data: recipes = [],
    isLoading: recipesLoading,
    isError: recipesError,
  } = useQuery<Recipe[]>({
    queryKey: ["recipes", debouncedSearch, filters.category, filters.area],
    queryFn: async () => {
      if (debouncedSearch) {
        return api.getRecipes(debouncedSearch);
      }
      if (filters.category) {
        return api.getRecipesByCategory(filters.category);
      }
      if (filters.area) {
        return api.getRecipesByArea(filters.area);
      }
      return api.getRecipes();
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const { data: categories = [] } = useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: api.getCategories,
    staleTime: 1000 * 60 * 60, // Cache categories for 1 hour
  });

  const { data: areas = [] } = useQuery<string[]>({
    queryKey: ["areas"],
    queryFn: api.getAreas,
    staleTime: 1000 * 60 * 60, // Cache areas for 1 hour
  });

  const {
    currentPage,
    visiblePages,
    hasNextPage,
    hasPreviousPage,
    setPage,
    nextPage,
    previousPage,
    startIndex,
    endIndex,
  } = usePagination({
    totalItems: recipes.length,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  // Get current page items
  const paginatedRecipes = recipes.slice(startIndex, endIndex);

  return {
    filters,
    updateFilters,
    categories,
    areas,
    isLoading: recipesLoading,
    isError: recipesError,
    paginatedRecipes,
    pagination: {
      currentPage,
      visiblePages,
      hasNextPage,
      hasPreviousPage,
      onPageChange: setPage,
      onNextPage: nextPage,
      onPreviousPage: previousPage,
    },
  };
}
