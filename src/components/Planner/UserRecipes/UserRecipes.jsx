import SearchRecipes from "./SearchRecipes.jsx";
import RecipeCard from "../../Recipes/RecipeCard.jsx";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";

const UserRecipes = () => {
  // get userSavedRecipes from a loader function
  // const { userRecipes } = useLoaderData();
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

  return (
    <Droppable droppableId="droppable-user-recipes">
      {(provided) => (
        <div
          className="h-[550px] w-[300px] border border-black"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2>Saved Recipes:</h2>
          <SearchRecipes recipesData={recipesData} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default UserRecipes;
