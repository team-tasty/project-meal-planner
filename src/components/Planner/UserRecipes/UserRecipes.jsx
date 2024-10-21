import SearchRecipes from "./SearchRecipes.jsx";
import RecipeCard from "../../Recipes/RecipeCard.jsx";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import AddUserRecipeButton from "../../Recipes/AddUserRecipeButton.jsx";

const UserRecipes = ({ userRecipes, setUserRecipes }) => {
  return (
    <Droppable droppableId="droppable-user-recipes">
      {(provided) => (
        <div
          className=" w-[95vw] flex flex-col items-center"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2>Saved Recipes</h2>
          <SearchRecipes
            recipesData={userRecipes}
            setRecipesData={setUserRecipes}
          />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default UserRecipes;
