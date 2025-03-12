import { useSearchParams } from "react-router-dom";

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  maxVisiblePages?: number;
}

export function usePagination({
  totalItems,
  itemsPerPage,
  maxVisiblePages = 7,
}: UsePaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Calculating basic pagination values
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = Math.min(
    Math.max(1, Number(searchParams.get("page")) || 1),
    totalPages || 1
  );

  // Handling of page changes
  const setPage = (newPage: number) => {
    const validPage = Math.min(Math.max(1, newPage), totalPages);
    const newSearchParams = new URLSearchParams(searchParams);

    if (validPage > 1) {
      newSearchParams.set("page", validPage.toString());
    } else {
      newSearchParams.delete("page");
    }

    setSearchParams(newSearchParams);
  };

  // Generating page numbers with ellipsis
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - 2);
      i <= Math.min(totalPages - 1, currentPage + 2);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return {
    // Current state
    currentPage,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    visiblePages: getVisiblePages(),

    // Actions
    setPage,
    nextPage: () => setPage(currentPage + 1),
    previousPage: () => setPage(currentPage - 1),

    // Pagination metadata for the current page
    startIndex: (currentPage - 1) * itemsPerPage,
    endIndex: Math.min(currentPage * itemsPerPage, totalItems),
  };
}
