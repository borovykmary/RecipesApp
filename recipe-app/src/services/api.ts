import axios from "axios";
import { API } from "../constants/apiConfig";
import { Recipe } from "../types/recipe";

interface SimplifiedRecipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export const api = {
  async getRecipes(search?: string) {
    if (search) {
      const response = await axios.get(
        `${API.BASE_URL}/search.php?s=${search}`
      );
      return response.data.meals || [];
    } else {
      // If no search term, get recipes for each letter to get a complete list
      const letters = "abcdefghijklmnopqrstuvwxyz".split("");
      const recipesPromises = letters.map((letter) =>
        axios.get(`${API.BASE_URL}/search.php?f=${letter}`)
      );

      const responses = await Promise.all(recipesPromises);
      const allRecipes = responses
        .map((response) => response.data.meals || [])
        .flat()
        .filter(
          (recipe, index, self) =>
            // Remove duplicates based on idMeal
            index === self.findIndex((r) => r.idMeal === recipe.idMeal)
        );

      return allRecipes;
    }
  },

  async getRecipeById(id: string) {
    const response = await axios.get(`${API.BASE_URL}/lookup.php?i=${id}`);
    return response.data.meals?.[0] || null;
  },

  async getCategories() {
    const response = await axios.get(`${API.BASE_URL}/categories.php`);
    return response.data.categories.map(
      (category: { strCategory: string }) => category.strCategory
    );
  },

  async getAreas() {
    const response = await axios.get(`${API.BASE_URL}/list.php?a=list`);
    return response.data.meals.map((area: { strArea: string }) => area.strArea);
  },

  async getRecipesByCategory(category: string): Promise<Recipe[]> {
    const response = await axios.get(
      `${API.BASE_URL}/filter.php?c=${category}`
    );
    if (!response.data.meals) return [];

    // Get full details for the first 20 recipes to show more variety
    const recipes = response.data.meals.slice(0, 20);
    const fullRecipesPromises = recipes.map((recipe: SimplifiedRecipe) =>
      this.getRecipeById(recipe.idMeal)
    );
    const fullRecipes = await Promise.all(fullRecipesPromises);
    return fullRecipes.filter((recipe): recipe is Recipe => recipe !== null);
  },

  async getRecipesByArea(area: string): Promise<Recipe[]> {
    const response = await axios.get(`${API.BASE_URL}/filter.php?a=${area}`);
    if (!response.data.meals) return [];

    // Get full details for the first 20 recipes to show more variety
    const recipes = response.data.meals.slice(0, 20);
    const fullRecipesPromises = recipes.map((recipe: SimplifiedRecipe) =>
      this.getRecipeById(recipe.idMeal)
    );
    const fullRecipes = await Promise.all(fullRecipesPromises);
    return fullRecipes.filter((recipe): recipe is Recipe => recipe !== null);
  },
};
