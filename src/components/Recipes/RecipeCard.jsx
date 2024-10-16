import { useState, useEffect } from "react";
import { GoHeartFill } from "react-icons/go";
import axios from "axios";

const RecipeCard = ({
  recipe,
  setModalData,
  setDisplayModal,
  displayModal,
  index,
  handleDelete,
  dayIndex,
  externalIds,
  setExternalIds,
}) => {
  // map over all recipes received from the recipes page and create cards for them
  // to display in each card: image, title, category

  // do map of externalIds to get each userRecipe
  let userRecipesIds;
  if (externalIds) {
    userRecipesIds = externalIds.map((userRecipe) => {
      return userRecipe.recipe.externalRecipeId;
    });
  }

  // set state values
  const [saved, setSaved] = useState(false);
  // const [recipeData, setRecipeData] = useState([recipe]);
  // console.log(recipeData);

  const handleClick = async () => {
    // make call to backend to save the recipe to our database
    // create body object
    const recipeObj = {
      recipeId: recipe.recipeId,
      title: recipe.title,
      instruction: recipe.instruction,
      image: recipe.image,
      category: recipe.category,
      area: recipe.area,
      tag: recipe.tag,
      recipeIngredients: recipe.recipeIngredients,
    };

    // make axios call
    if (!saved) {
      const res = await axios.post("/api/save-recipe", { recipeObj });
      console.log(res.data);

      // if successful...
      if (res.data.success) {
        // change the fill color of the heart/checkmark/star
        // setSaved(true);
        // update the externalIds Array
        setExternalIds(res.data.externalIds);
      }
    }

    // only if saved
    if (saved) {
      // make call to backend to delete recipe from our db
      // will need id or some identifier to send back
      const res = await axios.delete(`/api/unsave-recipe/${recipe.recipeId}`);
      console.log(res.data);

      // if successful...
      if (res.data.success) {
        // change the fill color of save icon to white
        // setSaved(false);
        // update the externalIds Array
        setExternalIds(res.data.externalIds);
      }
    }
  };

  useEffect(() => {
    if (externalIds) {
      if (userRecipesIds.includes(+recipe.recipeId)) {
        setSaved(true);
      }
    }
  }, [externalIds]);

  return (
    <div
      onClick={() => {
        setModalData(recipe);
        setDisplayModal(!displayModal);
      }}
      className="h-32 w-72 border border-black flex items-center justify-around"
    >
      <img src={`${recipe.image}`} className="h-20 w-24" />
      <div>
        <h1>{recipe.title}</h1>
        <h2>{recipe.category}</h2>
      </div>
      {handleDelete && (
        <button
          onClick={(e) => {
            handleDelete(dayIndex, index);
            e.stopPropagation();
          }}
        >
          Delete
        </button>
      )}
      {!handleDelete && (
        <GoHeartFill
          className={
            saved
              ? "h-10 w-10 fill-red-500 stroke-red-500 stroke-[1px]"
              : "h-10 w-10 fill-white stroke-red-500 stroke-[1px]"
          }
          onClick={(e) => {
            handleClick();
            e.stopPropagation();
          }}
        />
      )}
    </div>
  );
};

export default RecipeCard;
