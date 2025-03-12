import React, { useState } from "react";
import { Recipe } from "../types/recipe";

interface IngredientsListProps {
  recipe: Recipe;
}

interface Ingredient {
  ingredient: string;
  measure: string;
}

const styles = {
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "32px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "16px",
    marginBottom: "16px",
  },
  ingredientItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: "8px",
    color: "white",
  },
  measure: {
    color: "var(--color-primary)",
    fontWeight: 600,
  },
  seeMoreButton: {
    background: "none",
    border: "none",
    color: "var(--color-primary)",
    cursor: "pointer",
    fontSize: "1rem",
    padding: "8px 16px",
    borderRadius: "8px",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
  },
};

export function IngredientsList({ recipe }: IngredientsListProps) {
  const [showAll, setShowAll] = useState(false);

  // Extract all ingredients
  const allIngredients: Ingredient[] = [];
  let i = 1;
  while (true) {
    const ingredient = recipe[`strIngredient${i}` as keyof typeof recipe];
    const measure = recipe[`strMeasure${i}` as keyof typeof recipe];

    if (
      !ingredient ||
      typeof ingredient !== "string" ||
      ingredient.trim() === ""
    )
      break;

    allIngredients.push({
      ingredient,
      measure: typeof measure === "string" ? measure : "",
    });
    i++;
  }

  const displayedIngredients = showAll
    ? allIngredients
    : allIngredients.slice(0, 10);

  const hasMoreIngredients = allIngredients.length > 10;

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        {displayedIngredients.map((item, index) => (
          <div key={index} style={styles.ingredientItem}>
            <span style={styles.measure}>{item.measure}</span>
            <span>{item.ingredient}</span>
          </div>
        ))}
      </div>

      {hasMoreIngredients && !showAll && (
        <button style={styles.seeMoreButton} onClick={() => setShowAll(true)}>
          See {allIngredients.length - 10} more ingredients
        </button>
      )}
    </div>
  );
}
