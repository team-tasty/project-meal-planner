import SearchAPI from "./SearchAPI";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import AddUserRecipeButton from "./AddUserRecipeButton";

const RecipesPage = () => {
  // Mock data to set up card display
  const [recipesData, setRecipesData] = useState(useLoaderData().recipesData);
  const { externalIds } = useLoaderData();
  console.log(recipesData);
  console.log(externalIds);

  // do map of externalIds to get each userRecipe
  const userRecipesIds = externalIds.map((userRecipe) => {
    return userRecipe.recipe.externalRecipeId;
  });

  console.log(userRecipesIds);

  const [displayModal, setDisplayModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  const recipeCards = recipesData.map((recipe) => {
    return (
      <RecipeCard
        key={recipe.recipeId}
        recipe={recipe}
        setModalData={setModalData}
        setDisplayModal={setDisplayModal}
        displayModal={displayModal}
        userRecipesIds={userRecipesIds}
      />
    );
  });

  return (
    <div className="flex justify-between">
      {displayModal && (
        <RecipeModal setDisplayModal={setDisplayModal} modalData={modalData} />
      )}
      <div>
        Recipes Page
        <SearchAPI setRecipesData={setRecipesData} />
        {recipeCards}
      </div>
      <div>
        <AddUserRecipeButton />
      </div>
    </div>
  );
};

export default RecipesPage;
