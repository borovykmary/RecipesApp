import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { Navigation } from "../components/Navigation";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LayersIcon from "@mui/icons-material/Layers";
import LanguageIcon from "@mui/icons-material/Language";
import YouTubeIcon from "@mui/icons-material/YouTube";

export function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedRecipes, setSelectedRecipes] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("selectedRecipes");
    return new Set(saved ? JSON.parse(saved) : []);
  });

  const { data: recipe, isLoading } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => api.getRecipeById(id!),
    enabled: !!id,
  });

  useEffect(() => {
    localStorage.setItem(
      "selectedRecipes",
      JSON.stringify(Array.from(selectedRecipes))
    );
  }, [selectedRecipes]);

  const toggleRecipeSelection = (recipeId: string) => {
    const newSelected = new Set(selectedRecipes);
    if (newSelected.has(recipeId)) {
      newSelected.delete(recipeId);
    } else {
      newSelected.add(recipeId);
    }
    setSelectedRecipes(newSelected);
  };

  if (isLoading) {
    return (
      <>
        <Navigation selectedRecipesCount={selectedRecipes.size} />
        <main style={{ paddingTop: "80px" }}>
          <div className="container">
            <div style={{ padding: "48px 0" }}>
              <div style={{ textAlign: "center", color: "white" }}>
                Loading...
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!recipe) {
    return (
      <>
        <Navigation selectedRecipesCount={selectedRecipes.size} />
        <main style={{ paddingTop: "80px" }}>
          <div className="container">
            <div style={{ padding: "48px 0" }}>
              <div style={{ textAlign: "center", color: "white" }}>
                Recipe not found
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}` as keyof typeof recipe];
    const measure = recipe[`strMeasure${i}` as keyof typeof recipe];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <>
      <Navigation selectedRecipesCount={selectedRecipes.size} />
      <main style={{ paddingTop: "80px" }}>
        <div className="container">
          <div style={{ padding: "48px 0" }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "none",
                border: "none",
                color: "var(--color-primary)",
                fontSize: "1rem",
                fontWeight: 500,
                cursor: "pointer",
                padding: "0",
                marginBottom: "32px",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateX(-4px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "none";
              }}
            >
              <KeyboardBackspaceIcon />
              Go Back
            </button>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.5fr",
                gap: "48px",
                alignItems: "start",
              }}
            >
              <div>
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  style={{
                    width: "100%",
                    borderRadius: "16px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <div
                  style={{
                    marginTop: "24px",
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
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
                        maxWidth: "100px",
                      }}
                      title={recipe.strCategory}
                    >
                      <LayersIcon sx={{ fontSize: 16 }} />
                      <span
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {recipe.strCategory}
                      </span>
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
                      <LanguageIcon sx={{ fontSize: 16 }} />
                      {recipe.strArea}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div style={{ marginBottom: "16px" }}>
                  <h1
                    style={{
                      fontSize: "3rem",
                      marginBottom: "16px",
                      color: "white",
                      fontFamily: "Playfair Display, serif",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                      lineHeight: 1.2,
                    }}
                    title={recipe.strMeal}
                  >
                    {recipe.strMeal}
                  </h1>
                  <button
                    onClick={() => toggleRecipeSelection(recipe.idMeal)}
                    className="button"
                    style={{
                      padding: "8px 16px",
                      backgroundColor: selectedRecipes.has(recipe.idMeal)
                        ? "var(--color-primary)"
                        : "rgba(255, 255, 255, 0.2)",
                      color: selectedRecipes.has(recipe.idMeal)
                        ? "var(--color-secondary)"
                        : "white",
                      fontSize: "0.875rem",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.2s ease-in-out",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {selectedRecipes.has(recipe.idMeal) ? "Selected" : "Select"}
                  </button>
                </div>

                <div style={{ marginBottom: "32px" }}>
                  <h2
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "16px",
                      color: "var(--color-primary)",
                      fontFamily: "Playfair Display, serif",
                    }}
                  >
                    Instructions
                  </h2>
                  <p
                    style={{
                      color: "var(--color-gray-300)",
                      lineHeight: "1.6",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {recipe.strInstructions}
                  </p>
                </div>

                <div>
                  <h2
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "16px",
                      color: "var(--color-primary)",
                      fontFamily: "Playfair Display, serif",
                    }}
                  >
                    Ingredients
                  </h2>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(200px, 1fr))",
                      gap: "16px",
                    }}
                  >
                    {ingredients.map(({ ingredient, measure }, index) => (
                      <div
                        key={index}
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          padding: "16px",
                          borderRadius: "8px",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        <div
                          style={{
                            color: "white",
                            fontSize: "1rem",
                            fontWeight: 500,
                            marginBottom: "4px",
                          }}
                        >
                          {ingredient}
                        </div>
                        <div
                          style={{
                            color: "var(--color-gray-400)",
                            fontSize: "0.875rem",
                          }}
                        >
                          {measure}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {recipe.strYoutube && (
                  <div style={{ marginTop: "32px" }}>
                    <h2
                      style={{
                        fontSize: "1.5rem",
                        marginBottom: "16px",
                        color: "var(--color-primary)",
                        fontFamily: "Playfair Display, serif",
                      }}
                    >
                      Video Tutorial
                    </h2>
                    <a
                      href={recipe.strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-secondary)",
                        padding: "12px 24px",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontWeight: 500,
                        transition: "transform 0.2s ease-in-out",
                      }}
                      onMouseOver={(e) =>
                        ((e.target as HTMLElement).style.transform =
                          "translateY(-2px)")
                      }
                      onMouseOut={(e) =>
                        ((e.target as HTMLElement).style.transform = "none")
                      }
                    >
                      <YouTubeIcon />
                      Watch on YouTube
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
