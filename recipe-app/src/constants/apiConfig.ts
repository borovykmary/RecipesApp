export const API = {
  BASE_URL: "https://www.themealdb.com/api/json/v1/1",
  ENDPOINTS: {
    SEARCH: "/search.php",
    LOOKUP: "/lookup.php",
    CATEGORIES: "/list.php",
  },
  PARAMS: {
    SEARCH: "s",
    ID: "i",
    CATEGORY: "c",
  },
} as const;
