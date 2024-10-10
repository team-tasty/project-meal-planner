import SearchAPI from "./SearchAPI";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";
import { useState, useEffect } from "react";
import axios from "axios";

const RecipesPage = () => {
  // Mock data to set up card display
  const [recipesData, setRecipesData] = useState([
    {
      recipeId: 1,
      title: "Chicken Alfredo",
      image:
        "https://borrowedbites.com/wp-content/uploads/2024/01/Square-One-Pot-Chicken-Alfredo.jpg",
      category: "Pasta",
      instruction:
        "Cook the pasta according to the box instructions. While the pasta is cooking, prepare the sauce by...",
      tags: "noodles,dinner,poultry",
      area: "Italian",
    },
    {
      recipeId: 2,
      title: "Brownies",
      image:
        "https://mytxkitchen.com/wp-content/uploads/2022/08/Fudgy-Chocolate-Brownies-4-500x375.jpg",
      category: "Desserts",
      instruction:
        "Prepare the brownies according to the box instructions. While the brownies are baking...",
      tags: null,
      area: "American",
    },
  ]);
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
