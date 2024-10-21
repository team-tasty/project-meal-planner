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
          className=" w-[95vw] lg:w-[35vw] flex flex-col items-center max-w-[600px]"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2 className="font-bold my-1">Saved Recipes</h2>
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
