import SearchAPI from "./SearchAPI";
import RecipeCard from "./RecipeCard";
import { useState } from "react";

const RecipesPage = () => {
  // Mock data to set up card display
  const [recipesData, setRecipesData] = useState([
    {
      recipeId: 1,
      title: "Chicken Alfredo",
      image:
        "https://borrowedbites.com/wp-content/uploads/2024/01/Square-One-Pot-Chicken-Alfredo.jpg",
      category: "Pasta",
    },
    {
      recipeId: 2,
      title: "Brownies",
      image:
        "https://mytxkitchen.com/wp-content/uploads/2022/08/Fudgy-Chocolate-Brownies-4-500x375.jpg",
      category: "Desserts",
    },
  ]);

  // Populate this page with the 8 seed data recipes to start (loader function?)

  const recipeCards = recipesData.map((recipe) => {
    return <RecipeCard key={recipe.recipeId} recipe={recipe} />;
  });

  return (
    <div>
      Recipes Page
      <SearchAPI SetRecipesData={setRecipesData} />
      {recipeCards}
    </div>
  );
};

export default RecipesPage;
