import { useState } from "react";
import { GoHeartFill } from "react-icons/go";

const RecipeCard = ({
  recipe,
  setModalData,
  setDisplayModal,
  displayModal,
  index,
  handleDelete,
  dayIndex,
}) => {
  // map over all recipes received from the recipes page and create cards for them
  // to display in each card: image, title, category

  // set state values
  const [saved, setSaved] = useState(false);
  // const [recipeData, setRecipeData] = useState([recipe]);
  // console.log(recipeData);

  const handleSave = () => {
    // make call to backend to save the recipe to our database
    // create body object

    // make axios call

    // if successful...

    // change the fill color of the heart/checkmark/star
    setSaved(!saved);
  };

  // only if saved
  const handleUnsave = () => {
    // make call to backend to delete recipe from our db
    // will need id or some identifier to send back

    // if successful...

    // change the fill color of save icon to white
    setSaved(!saved);
  };

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
        <button onClick={() => handleDelete(dayIndex, index)}>Delete</button>
      )}
      {!handleDelete && (
        <GoHeartFill
          className="h-10 w-10 fill-white stroke-red-500 stroke-[1px]"
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default RecipeCard;
