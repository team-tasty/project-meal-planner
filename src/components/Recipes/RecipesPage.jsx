import SearchAPI from "./SearchAPI";
import RecipeCard from "./RecipeCard";
import { useState } from "react";

const RecipesPage = () => {
  // set state values
  const [recipeData, setRecipeData] = useState([]);

  return (
    <div>
      Recipes Page
      <SearchAPI SetRecipeData={setRecipeData} />
    </div>
  );
};

export default RecipesPage;
