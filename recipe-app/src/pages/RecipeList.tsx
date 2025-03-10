import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { RecipeCard } from "../components/RecipeCard";
import { Pagination } from "../components/Pagination";
import { Navigation } from "../components/Navigation";
import { Recipe } from "../types/recipe";
import { useDebounce } from "../hooks/useDebounce";

const ITEMS_PER_PAGE = 9;

export function RecipeList() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecipes, setSelectedRecipes] = useState<Set<string>>(
    new Set()
  );

  const debouncedSearch = useDebounce(search);

  const { data: recipes = [] } = useQuery<Recipe[]>({
    queryKey: ["recipes", debouncedSearch],
    queryFn: () => api.getRecipes(debouncedSearch),
  });

  const { data: categories = [] } = useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: api.getCategories,
  });

  const filteredRecipes = recipes.filter(
    (recipe: Recipe) => !category || recipe.strCategory === category
  );

  const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);
  const paginatedRecipes = filteredRecipes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleRecipeSelection = (id: string) => {
    const newSelected = new Set(selectedRecipes);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRecipes(newSelected);
  };

  const selectedRecipeDetails = recipes.filter((recipe: Recipe) =>
    selectedRecipes.has(recipe.idMeal)
  );

  return (
    <>
      <Navigation selectedRecipesCount={selectedRecipeDetails.length} />
      <main style={{ paddingTop: "80px" }}>
        <div className="container">
          <div style={{ padding: "48px 0" }}>
            <h1
              style={{
                fontSize: "3.5rem",
                marginBottom: "24px",
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                color: "white",
              }}
            >
              Discover Recipes
            </h1>
            <div style={{ marginBottom: "48px" }}>
              <div style={{ maxWidth: "800px", marginBottom: "24px" }}>
                <input
                  className="input"
                  type="text"
                  placeholder="Search recipes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: "100%",
                    fontSize: "1.125rem",
                  }}
                />
              </div>
              <select
                className="input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: "200px",
                  fontSize: "1rem",
                }}
              >
                <option value="">All Categories</option>
                {categories.map((cat: string) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "32px",
                marginBottom: "48px",
              }}
            >
              {paginatedRecipes.map((recipe: Recipe) => (
                <RecipeCard
                  key={recipe.idMeal}
                  recipe={recipe}
                  onSelect={toggleRecipeSelection}
                  isSelected={selectedRecipes.has(recipe.idMeal)}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />

            {selectedRecipeDetails.length > 0 && (
              <div
                className="card"
                style={{ padding: "32px", marginTop: "48px" }}
              >
                <h2
                  style={{
                    fontSize: "2rem",
                    marginBottom: "24px",
                    color: "var(--color-primary)",
                  }}
                >
                  Selected Recipes ({selectedRecipeDetails.length})
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "24px",
                  }}
                >
                  {selectedRecipeDetails.map((recipe: Recipe) => (
                    <div
                      key={recipe.idMeal}
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        borderRadius: "12px",
                        padding: "20px",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "1.25rem",
                          marginBottom: "8px",
                          color: "white",
                        }}
                      >
                        {recipe.strMeal}
                      </h3>
                      <p
                        style={{
                          color: "var(--color-gray-400)",
                          fontSize: "0.875rem",
                        }}
                      >
                        {recipe.strCategory} · {recipe.strArea}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
