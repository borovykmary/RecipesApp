import React, { useState, useEffect } from "react";
import { RecipeCard } from "../components/RecipeCard";
import { Pagination } from "../components/Pagination";
import { Navigation } from "../components/Navigation";
import { Recipe } from "../types/recipe";
import SearchIcon from "@mui/icons-material/Search";
import { useRecipeFilters } from "../hooks/useRecipeFilters";

const styles = {
  messageContainer: {
    textAlign: "center" as const,
    fontSize: "1.25rem",
    marginTop: "48px",
  },
  heading: {
    fontSize: "3.5rem",
    marginBottom: "24px",
    fontFamily: "Playfair Display, serif",
    fontWeight: 700,
    color: "white",
  },
  filtersContainer: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    maxWidth: "1200px",
    marginBottom: "24px",
  },
  select: {
    fontSize: "1.125rem",
    width: "200px",
    flexShrink: 0,
  },
  searchInput: {
    width: "90%",
    fontSize: "1.125rem",
    paddingLeft: "48px",
  },
  recipeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "32px",
    marginBottom: "48px",
  },
};

export function RecipeList() {
  const {
    filters,
    updateFilters,
    categories,
    areas,
    isLoading,
    isError,
    paginatedRecipes,
    pagination,
  } = useRecipeFilters();

  const [selectedRecipes, setSelectedRecipes] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("selectedRecipes");
    return new Set(saved ? JSON.parse(saved) : []);
  });

  useEffect(() => {
    localStorage.setItem(
      "selectedRecipes",
      JSON.stringify(Array.from(selectedRecipes))
    );
  }, [selectedRecipes]);

  const toggleRecipeSelection = (id: string) => {
    setSelectedRecipes((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div style={{ ...styles.messageContainer, color: "white" }}>
          Loading recipes...
        </div>
      );
    }

    if (isError) {
      return (
        <div
          style={{ ...styles.messageContainer, color: "var(--color-accent)" }}
        >
          Error loading recipes. Please try again later.
        </div>
      );
    }

    if (paginatedRecipes.length === 0) {
      return (
        <div
          style={{ ...styles.messageContainer, color: "var(--color-gray-300)" }}
        >
          No recipes found. Try a different search or category.
        </div>
      );
    }

    return (
      <>
        <div style={styles.recipeGrid}>
          {paginatedRecipes.map((recipe: Recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              onSelect={toggleRecipeSelection}
              isSelected={selectedRecipes.has(recipe.idMeal)}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      <Navigation selectedRecipesCount={selectedRecipes.size} />
      <main style={{ paddingTop: "80px" }}>
        <div className="container">
          <div style={{ padding: "48px 0" }}>
            <h1 style={styles.heading}>Discover New Recipes</h1>
            <div style={{ marginBottom: "48px" }}>
              <div style={styles.filtersContainer}>
                <div style={{ flex: 1, position: "relative" }}>
                  <SearchIcon
                    sx={{
                      position: "absolute",
                      left: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--color-gray-400)",
                      fontSize: "20px",
                    }}
                  />
                  <input
                    className="input"
                    type="text"
                    placeholder="Search recipes..."
                    value={filters.search}
                    onChange={(e) => updateFilters({ search: e.target.value })}
                    style={styles.searchInput}
                  />
                </div>
                <select
                  className="input"
                  value={filters.category}
                  onChange={(e) => updateFilters({ category: e.target.value })}
                  style={styles.select}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <select
                  className="input"
                  value={filters.area}
                  onChange={(e) => updateFilters({ area: e.target.value })}
                  style={styles.select}
                >
                  <option value="">All Countries</option>
                  {areas.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {renderContent()}

            {paginatedRecipes.length > 0 && (
              <Pagination
                currentPage={pagination.currentPage}
                visiblePages={pagination.visiblePages}
                hasNextPage={pagination.hasNextPage}
                hasPreviousPage={pagination.hasPreviousPage}
                onPageChange={pagination.onPageChange}
                onNextPage={pagination.onNextPage}
                onPreviousPage={pagination.onPreviousPage}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
