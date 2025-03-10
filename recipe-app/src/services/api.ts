import axios from "axios";
import { API } from "../constants/apiConfig";

export const api = {
  async getRecipes(search?: string) {
    const response = await axios.get(
      search
        ? `${API.BASE_URL}${API.ENDPOINTS.SEARCH}?${API.PARAMS.SEARCH}=${search}`
        : `${API.BASE_URL}${API.ENDPOINTS.SEARCH}?${API.PARAMS.SEARCH}=`
    );
    return response.data.meals || [];
  },

  async getRecipeById(id: string) {
    const response = await axios.get(
      `${API.BASE_URL}${API.ENDPOINTS.LOOKUP}?${API.PARAMS.ID}=${id}`
    );
    return response.data.meals?.[0] || null;
  },

  async getCategories() {
    const response = await axios.get(
      `${API.BASE_URL}${API.ENDPOINTS.CATEGORIES}?${API.PARAMS.CATEGORY}=list`
    );
    return response.data.meals.map(
      (category: { strCategory: string }) => category.strCategory
    );
  },
};
