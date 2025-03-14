import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecipeList } from "./pages/RecipeList";
import { RecipeDetails } from "./pages/RecipeDetails";
import { BasketPage } from "./pages/BasketPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/basket" element={<BasketPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
