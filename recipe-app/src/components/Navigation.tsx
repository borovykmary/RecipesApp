import React from "react";
import { Link } from "react-router-dom";

interface NavigationProps {
  selectedRecipesCount: number;
}

export function Navigation({ selectedRecipesCount }: NavigationProps) {
  return (
    <nav
      style={{
        backgroundColor: "rgba(26, 26, 26, 0.95)",
        backdropFilter: "blur(10px)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "80px",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "1.5rem",
            fontFamily: "Playfair Display, serif",
            fontWeight: 700,
          }}
        >
          Recipes for You
        </Link>

        <div
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.2s ease-in-out",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {selectedRecipesCount > 0 && (
            <span
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-secondary)",
                borderRadius: "20px",
                padding: "2px 8px",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              {selectedRecipesCount}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
