import { useState } from "react";
import { GoHeartFill } from "react-icons/go";

const RecipeCard = ({ recipe }) => {
  // map over all recipes received from the recipes page and create cards for them
  // to display in each card: image, title, category

  // set state values
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <div className="h-60 w-96 border border-black">
      <img src={`${recipe.image}`} className="h-32 w-36" />
      <h1>{recipe.title}</h1>
      <h2>{recipe.category}</h2>
      <GoHeartFill
        className="h-10 w-10 fill-white stroke-red-500 stroke-[1px]"
        onClick={handleSave}
      />
    </div>
  );
};

export default RecipeCard;
