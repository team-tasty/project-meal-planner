import SearchAPI from "./SearchAPI";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";
import { useState, useEffect } from "react";
import axios from "axios";

const RecipesPage = () => {
  // Mock data to set up card display
  const [recipesData, setRecipesData] = useState([]);

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

  // Populate this page with recipes to start. Make a call to the backend?
  useEffect(() => {
    const populateRecipes = async () => {
      const searchInfo = {
        searchInput: "de",
        searchType: "s",
      };
      const res = await axios.post("/api/recipe-search", searchInfo);

      if (res.data.success) {
        setRecipesData(res.data.recipesData);
      }
    };

    populateRecipes();
  }, []);

  return (
    <>
      {displayModal && (
        <RecipeModal setDisplayModal={setDisplayModal} modalData={modalData} />
      )}
      <div>
        Recipes Page
        <SearchAPI SetRecipesData={setRecipesData} />
        {recipeCards}
      </div>
    </>
  );
};

export default RecipesPage;
