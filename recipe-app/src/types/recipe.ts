export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
  strInstructions: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
}

export interface RecipeIngredient {
  ingredient: string;
  measure: string;
}

export interface RecipeResponse {
  meals: Recipe[];
}

export interface RecipeFilters {
  search: string;
  category: string;
  page: number;
}

export interface SelectedRecipe extends Recipe {
  isSelected: boolean;
}
