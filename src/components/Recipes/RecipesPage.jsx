import SearchAPI from "./SearchAPI";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

const RecipesPage = () => {
  // Mock data to set up card display
  const [recipesData, setRecipesData] = useState(useLoaderData().recipesData);

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
      />
    );
  });

  return (
    <>
      {displayModal && (
        <RecipeModal setDisplayModal={setDisplayModal} modalData={modalData} />
      )}
      <div>
        Recipes Page
        <SearchAPI setRecipesData={setRecipesData} />
        {recipeCards}
      </div>
    </>
  );
};

export default RecipesPage;
