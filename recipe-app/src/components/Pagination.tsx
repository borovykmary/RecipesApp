import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: "8px 16px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "none",
          borderRadius: "8px",
          color: "white",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          opacity: currentPage === 1 ? 0.5 : 1,
          transition: "all 0.2s ease-in-out",
        }}
      >
        ←
      </button>

      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            style={{
              padding: "8px 16px",
              backgroundColor:
                currentPage === page
                  ? "var(--color-primary)"
                  : "rgba(255, 255, 255, 0.1)",
              border: "none",
              borderRadius: "8px",
              color: currentPage === page ? "var(--color-secondary)" : "white",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              fontWeight: currentPage === page ? "600" : "400",
            }}
          >
            {page}
          </button>
        ) : (
          <span
            key={index}
            style={{
              padding: "8px 4px",
              color: "var(--color-gray-400)",
            }}
          >
            {page}
          </span>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: "8px 16px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "none",
          borderRadius: "8px",
          color: "white",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          opacity: currentPage === totalPages ? 0.5 : 1,
          transition: "all 0.2s ease-in-out",
        }}
      >
        →
      </button>
    </div>
  );
}
