import SearchAPI from "./SearchAPI";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

const RecipesPage = () => {
  // Mock data to set up card display
  const [recipesData, setRecipesData] = useState(useLoaderData().recipesData);
  const [externalIds, setExternalIds] = useState(useLoaderData().externalIds);

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
    <div className="flex flex-col items-center h-[90vh] box-border">
      {displayModal && (
        <RecipeModal setDisplayModal={setDisplayModal} modalData={modalData} />
      )}
      <div className="flex flex-col items-center h-full mx-2">
        <h1 className="my-4 text-2xl text-center">Recipes Page</h1>
        <SearchAPI setRecipesData={setRecipesData} />
        <div className="time-picker-scrollbar flex flex-col items-stretch overflow-auto max-w-[400px] w-[95vw]">
          {recipeCards}
        </div>
      </div>
    </div>
  );
};

export default RecipesPage;
