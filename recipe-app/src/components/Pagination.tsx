import React from "react";

interface PaginationProps {
  currentPage: number;
  visiblePages: (number | string)[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

export function Pagination({
  currentPage,
  visiblePages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
  onNextPage,
  onPreviousPage,
}: PaginationProps) {
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
        onClick={onPreviousPage}
        disabled={!hasPreviousPage}
        style={{
          padding: "8px 16px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "none",
          borderRadius: "8px",
          color: "white",
          cursor: hasPreviousPage ? "pointer" : "not-allowed",
          opacity: hasPreviousPage ? 1 : 0.5,
          transition: "all 0.2s ease-in-out",
        }}
      >
        ←
      </button>

      {visiblePages.map((page, index) =>
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
        onClick={onNextPage}
        disabled={!hasNextPage}
        style={{
          padding: "8px 16px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "none",
          borderRadius: "8px",
          color: "white",
          cursor: hasNextPage ? "pointer" : "not-allowed",
          opacity: hasNextPage ? 1 : 0.5,
          transition: "all 0.2s ease-in-out",
        }}
      >
        →
      </button>
    </div>
  );
}
