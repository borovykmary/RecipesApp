import React from "react";
import { useParams } from "react-router-dom";

export function RecipeDetails() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Recipe Details</h1>
      <p>Showing details for recipe ID: {id}</p>
    </div>
  );
}
