import React from "react";
import { Link } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FastfoodIcon from "@mui/icons-material/Fastfood";

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
          Recipes for You <FastfoodIcon />
        </Link>

        <Link
          to="/basket"
          style={{
            textDecoration: "none",
            color: "white",
            position: "relative",
          }}
        >
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
            <ShoppingBasketIcon />
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
        </Link>
      </div>
    </nav>
  );
}
