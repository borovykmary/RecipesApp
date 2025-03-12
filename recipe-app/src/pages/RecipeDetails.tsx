import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { Navigation } from "../components/Navigation";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LayersIcon from "@mui/icons-material/Layers";
import LanguageIcon from "@mui/icons-material/Language";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { IngredientsList } from "../components/IngredientsList";

const styles = {
  heading: {
    fontSize: "3rem",
    marginBottom: "16px",
    color: "white",
    fontFamily: "Playfair Display, serif",
  },
  categories: {
    display: "flex",
    gap: "12px",
    color: "var(--color-gray-300)",
    fontSize: "1.125rem",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr",
    gap: "48px",
    alignItems: "start",
  },
  imageContainer: {
    position: "sticky" as const,
    top: "100px",
  },
  image: {
    width: "100%",
    borderRadius: "16px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  details: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "48px",
  },
  sectionHeading: {
    fontSize: "1.5rem",
    marginBottom: "16px",
    color: "var(--color-primary)",
    fontFamily: "Playfair Display, serif",
  },
  instructions: {
    color: "var(--color-gray-300)",
    lineHeight: "1.6",
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  },
  videoContainer: {
    position: "relative" as const,
    paddingBottom: "56.25%", // 16:9 aspect ratio
    height: 0,
    overflow: "hidden",
    borderRadius: "16px",
  },
  selectButton: {
    padding: "12px 24px",
    backgroundColor: "var(--color-primary)",
    color: "var(--color-secondary)",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  },
  selectedButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
  },
  backButton: {
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
  },
  categoryBadge: {
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
  },
  areaBadge: {
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
  },
  youtubeButton: {
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
    border: "none",
    cursor: "pointer",
  },
};

export function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [selectedRecipes, setSelectedRecipes] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("selectedRecipes");
    return new Set(saved ? JSON.parse(saved) : []);
  });

  const {
    data: recipe,
    isLoading,
    isError,
  } = useQuery({
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
    setSelectedRecipes((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(recipeId)) {
        newSelected.delete(recipeId);
      } else {
        newSelected.add(recipeId);
      }
      return newSelected;
    });
  };

  if (!id) {
    navigate("/");
    return null;
  }

  return (
    <>
      <Navigation selectedRecipesCount={selectedRecipes.size} />
      <main style={{ paddingTop: "80px" }}>
        <div className="container">
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error loading recipe</div>
          ) : recipe ? (
            <div style={{ padding: "48px 0" }}>
              <button
                onClick={() => navigate(-1)}
                style={styles.backButton}
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

              <div style={{ marginBottom: "48px" }}>
                <h1 style={styles.heading}>{recipe.strMeal}</h1>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  <div style={styles.categories}>
                    <div style={styles.categoryBadge}>
                      <LayersIcon sx={{ fontSize: 16 }} />
                      <span>{recipe.strCategory}</span>
                    </div>
                    <div style={styles.areaBadge}>
                      <LanguageIcon sx={{ fontSize: 16 }} />
                      <span>{recipe.strArea}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleRecipeSelection(recipe.idMeal)}
                    style={{
                      ...styles.selectButton,
                      ...(selectedRecipes.has(recipe.idMeal)
                        ? styles.selectedButton
                        : {}),
                    }}
                  >
                    {selectedRecipes.has(recipe.idMeal)
                      ? "Selected"
                      : "Select Recipe"}
                  </button>
                </div>
              </div>

              <div style={styles.content}>
                <div style={styles.imageContainer}>
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    style={styles.image}
                  />
                </div>

                <div style={styles.details}>
                  <section>
                    <h2 style={styles.sectionHeading}>Ingredients</h2>
                    <IngredientsList recipe={recipe} />
                  </section>

                  <section>
                    <h2 style={styles.sectionHeading}>Instructions</h2>
                    <div style={styles.instructions}>
                      {recipe.strInstructions
                        .split("\n")
                        .map((step: string, index: number) => (
                          <p key={index}>{step}</p>
                        ))}
                    </div>
                  </section>

                  {recipe.strYoutube && (
                    <section>
                      <h2 style={styles.sectionHeading}>Video Tutorial</h2>
                      <div style={{ marginBottom: "16px" }}>
                        <a
                          href={recipe.strYoutube}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={styles.youtubeButton}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform =
                              "translateY(-2px)";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = "none";
                          }}
                        >
                          <YouTubeIcon />
                          Watch on YouTube
                        </a>
                      </div>
                      <div style={styles.videoContainer}>
                        <iframe
                          width="100%"
                          height="100%"
                          src={recipe.strYoutube.replace("watch?v=", "embed/")}
                          title="Recipe video tutorial"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
}
