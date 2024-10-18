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
    <div className="mt-4 flex flex-col place-items-center">
      {displayModal && (
        <RecipeModal setDisplayModal={setDisplayModal} modalData={modalData} />
      )}
      <div className="w-[430px]">
        <h1 className="mb-4 text-2xl text-center">Recipes Page</h1>
        <SearchAPI setRecipesData={setRecipesData} />
        {recipeCards}
      </div>
    </div>
  );
};

export default RecipesPage;
