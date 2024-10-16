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
  const [externalIds, setExternalIds] = useState(useLoaderData().externalIds);
  console.log(recipesData);
  console.log(externalIds);

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
        externalIds={externalIds}
        setExternalIds={setExternalIds}
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
