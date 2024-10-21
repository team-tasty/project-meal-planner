import { useState, useEffect } from "react";
import { GoHeartFill } from "react-icons/go";
import axios from "axios";
import { FaR, FaRegTrashCan } from "react-icons/fa6";
import { PiBowlFood } from "react-icons/pi";

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
  recipesData,
  setRecipesData,
}) => {
  // set state values
  const [saved, setSaved] = useState(false);
  const [userRecipeId, setUserRecipeId] = useState(null);
  // map over all recipes received from the recipes page and create cards for them
  // to display in each card: image, title, category

  // console.log(recipesData);
  // console.log("RECIPE", recipe);
  const weekMealId = recipe.weekMealId;

  // do map of externalIds to get each userRecipe
  let userExternalRecipesIds;
  let userRecipesIds;
  if (externalIds) {
    userExternalRecipesIds = externalIds.map((userRecipe) => {
      return userRecipe.recipe.externalRecipeId; // returns array with all the external ids
    });
    userRecipesIds = externalIds.map((userRecipe) => {
      return userRecipe.userRecipeId; // returns an array with all the userRecipe ids
    });
  }
  // console.log("externalIds: ", externalIds);
  // console.log("userExternalRecipesIds: ", userExternalRecipesIds);

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
      if (!externalIds) {
        // = this component is on the Planner page
        const res = await axios.delete(
          `/api/unsave-recipe/${recipe.userRecipeId}`
        );
        console.log(res.data);

        if (res.data.success) {
          // const userRecipeToDelete = recipesData.filter((element) => {
          //   return element.userRecipeId === +recipe.userRecipeId;
          // });
          // console.log(userRecipeToDelete);

          // const indexOfRecipeToDelete = recipesData.indexOf(
          //   userRecipeToDelete[0]
          // );
          // console.log(indexOfRecipeToDelete);
          // const newUserRecipes = [...recipesData];
          // newUserRecipes.splice(indexOfRecipeToDelete, 1);
          // console.log(newUserRecipes);

          // for some reason this is not updating the state value. Is it because they are named different things in the grandparent?
          setRecipesData(res.data.updatedUserRecipes);
          // console.log(res.data.updatedUserRecipes);
        }
      } else {
        // = this component is on the Recipes page
        const userRecipeIdToDelete = externalIds.filter(
          (ids) => ids.recipe.externalRecipeId === +recipe.recipeId
        )[0].userRecipeId;
        const res = await axios.delete(
          `/api/unsave-recipe/${userRecipeIdToDelete}`
        );
        console.log(res.data);

        // if successful...
        if (res.data.success) {
          // change the fill color of save icon to white
          // setSaved(false);
          // update the externalIds Array
          setExternalIds(res.data.externalIds);
        }
      }
    }
  };
  // console.log(recipesData);

  useEffect(() => {
    // On recipes page
    if (externalIds) {
      if (userExternalRecipesIds.includes(+recipe.recipeId)) {
        setSaved(true);
      } else {
        setSaved(false);
      }
      // WHAT SEAN WAS WORKING ON
      //   const externalRecipe = externalIds.find((externalRecipe) => {
      //     // console.log("RECIPE.RECIPEID:", recipe.recipeId)
      //     return externalRecipe.recipe.recipeExternalId === recipe.recipeId;
      //   });
      //   console.log("EXTERNALRECIPE:", externalRecipe);
      //   if (externalRecipe) setSaved(true);

      // on planner page
    } else {
      setSaved(true);
    }
  }, [externalIds, recipesData]);

  console.log(`${recipe.title} image:`, recipe.image);

  return externalIds ? (
    <div
      onClick={() => {
        setModalData(recipe);
        setDisplayModal(!displayModal);
      }}
      className="recipeCard my-2 mx-[2px] flex justify-between items-center"
    >
      {recipe.image && (
        <img
          src={`${recipe.image}`}
          className="h-20 w-24 m-1 rounded-[5px] shrink-0"
        />
      )}
      {!recipe.image && (
        <div className="h-20 w-24 m-1 rounded-[5px] shrink-0 flex justify-center items-center">
          <PiBowlFood size={25} />
        </div>
      )}
      <div className="grow m-1">
        <h1 className="line-clamp-2">{recipe.title}</h1>
        <h3>{recipe.category}</h3>
      </div>
      {handleDelete && (
        <FaRegTrashCan
          size={25}
          className="mx-1 cursor-pointer shrink-0"
          onClick={(e) => {
            handleDelete(dayIndex, index);
            e.stopPropagation();
          }}
        />
      )}
      {!handleDelete && (
        <GoHeartFill
          className={
            saved
              ? "h-10 w-10 m-1 shrink-0 fill-red-500 stroke-red-500 stroke-[1px]"
              : "h-10 w-10 m-1 shrink-0 fill-white stroke-red-500 stroke-[1px]"
          }
          onClick={(e) => {
            handleClick();
            e.stopPropagation();
          }}
        />
      )}
    </div>
  ) : (
    <div
      onClick={() => {
        setModalData(recipe.recipe);
        setDisplayModal(!displayModal);
      }}
      className="recipeCard my-2 flex justify-between items-center"
    >
      {recipe.recipe.image && (
        <img
          src={`${recipe.recipe.image}`}
          className="h-20 w-24 m-1 rounded-[5px] shrink-0"
        />
      )}
      {!recipe.recipe.image && (
        <div className="h-20 w-24 m-1 rounded-[5px] shrink-0 flex justify-center items-center">
          <PiBowlFood size={25} />
        </div>
      )}
      <div className="grow m-1">
        <h1 className="line-clamp-2">{recipe.recipe.title}</h1>
        <h3>{recipe.recipe.category}</h3>
      </div>
      {handleDelete && (
        <FaRegTrashCan
          size={25}
          className="mx-1 cursor-pointer shrink-0"
          onClick={(e) => {
            handleDelete(weekMealId);
            e.stopPropagation();
          }}
        />
      )}
      {!handleDelete && (
        <GoHeartFill
          className={
            saved
              ? "h-10 w-10 m-1 shrink-0 fill-red-500 stroke-red-500 stroke-[1px]"
              : "h-10 w-10 m-1 shrink-0 fill-white stroke-red-500 stroke-[1px]"
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
