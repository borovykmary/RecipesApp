import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { RecipeCard } from "../components/RecipeCard";
import { Pagination } from "../components/Pagination";
import { Navigation } from "../components/Navigation";
import { Recipe } from "../types/recipe";
import { useDebounce } from "../hooks/useDebounce";
import SearchIcon from "@mui/icons-material/Search";

const ITEMS_PER_PAGE = 9;

export function RecipeList() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecipes, setSelectedRecipes] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("selectedRecipes");
    return new Set(saved ? JSON.parse(saved) : []);
  });

  const debouncedSearch = useDebounce(search, 500);

  const {
    data: recipes = [],
    isLoading: recipesLoading,
    isError: recipesError,
  } = useQuery<Recipe[]>({
    queryKey: ["recipes", debouncedSearch, category],
    queryFn: async () => {
      if (debouncedSearch) {
        return api.getRecipes(debouncedSearch);
      }
      if (category) {
        return api.getRecipesByCategory(category);
      }
      return api.getRecipes();
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<
    string[]
  >({
    queryKey: ["categories"],
    queryFn: api.getCategories,
    staleTime: 1000 * 60 * 60, // Cache categories for 1 hour
  });

  useEffect(() => {
    localStorage.setItem(
      "selectedRecipes",
      JSON.stringify(Array.from(selectedRecipes))
    );
  }, [selectedRecipes]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, category]);

  const totalPages = Math.ceil(recipes.length / ITEMS_PER_PAGE);
  const paginatedRecipes = recipes.slice(
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

  return (
    <>
      <Navigation selectedRecipesCount={selectedRecipes.size} />
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
              Discover New Recipes
            </h1>
            <div style={{ marginBottom: "48px" }}>
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                  maxWidth: "1200px",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    position: "relative",
                  }}
                >
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
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCategory("");
                    }}
                    style={{
                      width: "90%",
                      fontSize: "1.125rem",
                      paddingLeft: "48px",
                    }}
                  />
                </div>
                <select
                  className="input"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setSearch("");
                  }}
                  style={{
                    fontSize: "1.125rem",
                    width: "200px",
                    flexShrink: 0,
                  }}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {recipesLoading ? (
              <div
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: "1.25rem",
                  marginTop: "48px",
                }}
              >
                Loading recipes...
              </div>
            ) : recipesError ? (
              <div
                style={{
                  textAlign: "center",
                  color: "var(--color-accent)",
                  fontSize: "1.25rem",
                  marginTop: "48px",
                }}
              >
                Error loading recipes. Please try again later.
              </div>
            ) : recipes.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  color: "var(--color-gray-300)",
                  fontSize: "1.25rem",
                  marginTop: "48px",
                }}
              >
                No recipes found. Try a different search or category.
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(300px, 1fr))",
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

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
