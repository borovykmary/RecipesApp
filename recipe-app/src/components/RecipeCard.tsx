import React from "react";
import { Recipe } from "../types/recipe";
import { useNavigate } from "react-router-dom";

interface RecipeCardProps {
  recipe: Recipe;
  onSelect?: (id: string) => void;
  isSelected?: boolean;
}

export function RecipeCard({ recipe, onSelect, isSelected }: RecipeCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
      style={{ cursor: "pointer" }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          style={{
            width: "100%",
            height: "280px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
            padding: "20px",
            borderRadius: "0 0 12px 12px",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              marginBottom: "12px",
              color: "white",
              fontFamily: "Playfair Display, serif",
            }}
          >
            {recipe.strMeal}
          </h2>
          <div style={{ display: "flex", gap: "12px" }}>
            <div
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-secondary)",
                padding: "6px 12px",
                borderRadius: "4px",
                fontSize: "0.875rem",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              {recipe.strCategory}
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                color: "white",
                padding: "6px 12px",
                borderRadius: "4px",
                fontSize: "0.875rem",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                backdropFilter: "blur(4px)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              {recipe.strArea}
            </div>
          </div>
        </div>
        {onSelect && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(recipe.idMeal);
            }}
            className="button"
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              padding: "8px 16px",
              backgroundColor: isSelected
                ? "var(--color-primary)"
                : "rgba(255, 255, 255, 0.2)",
              color: isSelected ? "var(--color-secondary)" : "white",
              fontSize: "0.875rem",
              backdropFilter: "blur(4px)",
            }}
          >
            {isSelected ? "Selected" : "Select"}
          </button>
        )}
      </div>
    </div>
  );
}
