import SearchRecipes from "./SearchRecipes.jsx";
import RecipeCard from "../../Recipes/RecipeCard.jsx";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";

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
      instruction:
        "Cook the pasta according to the box instructions. While the pasta is cooking, prepare the sauce by...",
      tag: "noodles,dinner,poultry",
      area: "Italian",
      recipeIngredients: [
        {
          measurementQuantity: {
            quantity: 2,
          },
          measurementUnit: {
            unit: "tbsp",
          },
          ingredient: {
            ingredient: "cajun",
          },
        },
        {
          measurementQuantity: {
            quantity: 1,
          },
          measurementUnit: {
            unit: "tsp",
          },
          ingredient: {
            ingredient: "cayenne pepper",
          },
        },
      ],
    },
    {
      recipeId: 2,
      title: "Brownies",
      image:
        "https://mytxkitchen.com/wp-content/uploads/2022/08/Fudgy-Chocolate-Brownies-4-500x375.jpg",
      category: "Desserts",
      instruction:
        "Prepare the brownies according to the box instructions. While the brownies are baking...",
      tag: null,
      area: "American",
      recipeIngredients: [
        {
          measurementQuantity: {
            quantity: 3,
          },
          measurementUnit: {
            unit: "tsp",
          },

          ingredient: {
            ingredient: "sugar",
          },
        },
        {
          measurementQuantity: {
            quantity: 2,
          },
          measurementUnit: {
            unit: "large",
          },
          ingredient: {
            ingredient: "eggs",
          },
        },
      ],
    },
  ]);

  return (
    <Droppable droppableId="droppable-user-recipes">
      {(provided) => (
        <div
          className="h-[550px] w-[400px] border border-black"
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
