import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { api } from "../services/api";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LayersIcon from "@mui/icons-material/Layers";
import LanguageIcon from "@mui/icons-material/Language";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

interface Ingredient {
  name: string;
  measures: string[];
}

export function BasketPage() {
  const navigate = useNavigate();

  const selectedRecipeIds = JSON.parse(
    localStorage.getItem("selectedRecipes") || "[]"
  );

  const { data: recipes = [], isLoading } = useQuery({
    queryKey: ["selectedRecipes", selectedRecipeIds],
    queryFn: async () => {
      const recipePromises = selectedRecipeIds.map((id: string) =>
        api.getRecipeById(id)
      );
      return Promise.all(recipePromises);
    },
    enabled: selectedRecipeIds.length > 0,
  });

  const combinedIngredients = React.useMemo(() => {
    const ingredientMap = new Map<string, Ingredient>();

    recipes.forEach((recipe) => {
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}` as keyof typeof recipe];
        const measure = recipe[`strMeasure${i}` as keyof typeof recipe];

        if (ingredient && ingredient.trim() !== "") {
          if (!ingredientMap.has(ingredient)) {
            ingredientMap.set(ingredient, {
              name: ingredient,
              measures: [],
            });
          }
          if (measure && measure.trim() !== "") {
            ingredientMap
              .get(ingredient)!
              .measures.push(`${measure} (${recipe.strMeal})`);
          }
        }
      }
    });

    return Array.from(ingredientMap.values());
  }, [recipes]);

  if (selectedRecipeIds.length === 0) {
    return (
      <>
        <Navigation selectedRecipesCount={0} />
        <main style={{ paddingTop: "80px" }}>
          <div className="container">
            <div style={{ padding: "48px 0" }}>
              <div
                style={{
                  textAlign: "center",
                  color: "var(--color-gray-300)",
                  fontSize: "1.25rem",
                }}
              >
                No recipes selected yet. Go back and select some recipes!
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Navigation selectedRecipesCount={selectedRecipeIds.length} />
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

  return (
    <>
      <Navigation selectedRecipesCount={selectedRecipeIds.length} />
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

            <h1
              style={{
                fontSize: "3rem",
                marginBottom: "48px",
                color: "white",
                fontFamily: "Playfair Display, serif",
              }}
            >
              Your Recipe Basket
            </h1>

            <div style={{ marginBottom: "48px" }}>
              <h2
                style={{
                  fontSize: "2rem",
                  marginBottom: "24px",
                  color: "var(--color-primary)",
                  fontFamily: "Playfair Display, serif",
                }}
              >
                Selected Recipes
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "24px",
                }}
              >
                {recipes.map((recipe) => (
                  <div
                    key={recipe.idMeal}
                    className="card"
                    style={{
                      padding: "24px",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    <div
                      onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                      style={{
                        display: "flex",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                      <div>
                        <h3
                          style={{
                            fontSize: "1.25rem",
                            marginBottom: "8px",
                            color: "white",
                            fontFamily: "Playfair Display, serif",
                          }}
                          title={recipe.strMeal}
                        >
                          {recipe.strMeal}
                        </h3>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <span
                            style={{
                              backgroundColor: "var(--color-primary)",
                              color: "var(--color-secondary)",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              fontSize: "0.875rem",
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
                          </span>
                          <span
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.1)",
                              color: "white",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              fontSize: "0.875rem",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                            }}
                          >
                            <LanguageIcon sx={{ fontSize: 16 }} />
                            {recipe.strArea}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const newSelected = selectedRecipeIds.filter(
                          (id: string) => id !== recipe.idMeal
                        );
                        localStorage.setItem(
                          "selectedRecipes",
                          JSON.stringify(newSelected)
                        );
                        window.location.reload();
                      }}
                      style={{
                        width: "100%",
                        padding: "8px",
                        backgroundColor: "rgba(255, 59, 59, 0.1)",
                        color: "#ff3b3b",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition: "all 0.2s ease-in-out",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(255, 59, 59, 0.2)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(255, 59, 59, 0.1)";
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2
                style={{
                  fontSize: "2rem",
                  marginBottom: "24px",
                  color: "var(--color-primary)",
                  fontFamily: "Playfair Display, serif",
                }}
              >
                Needed Ingredients
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "24px",
                }}
              >
                {combinedIngredients.map((ingredient) => (
                  <div
                    key={ingredient.name}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      padding: "24px",
                      borderRadius: "12px",
                      backdropFilter: "blur(4px)",
                      display: "flex",
                      gap: "16px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "var(--color-primary)",
                        borderRadius: "8px",
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <DoneOutlineIcon
                        sx={{ fontSize: 20, color: "var(--color-secondary)" }}
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          color: "white",
                          fontSize: "1.125rem",
                          fontWeight: 600,
                          marginBottom: "12px",
                          fontFamily: "Playfair Display, serif",
                        }}
                      >
                        {ingredient.name}
                      </div>
                      {ingredient.measures.map((measure, index) => (
                        <div
                          key={index}
                          style={{
                            color: "var(--color-gray-400)",
                            fontSize: "0.875rem",
                            marginBottom: "8px",
                            paddingLeft: "4px",
                            borderLeft: "2px solid var(--color-primary)",
                          }}
                        >
                          {measure}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
