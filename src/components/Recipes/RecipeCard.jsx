import { useState } from "react";
import { GoHeartFill } from "react-icons/go";
import { Draggable } from "react-beautiful-dnd";

const RecipeCard = ({
  recipe,
  setModalData,
  setDisplayModal,
  displayModal,
}) => {
  // map over all recipes received from the recipes page and create cards for them
  // to display in each card: image, title, category

  // set state values
  const [saved, setSaved] = useState(false);
  // const [recipeData, setRecipeData] = useState([recipe]);
  // console.log(recipeData);

  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <Draggable draggableId="draggable-1" index={recipe.recipeId}>
      {(provided) => (
        <div
          onClick={() => {
            setModalData([recipe]);
            setDisplayModal(!displayModal);
          }}
          className="h-60 w-96 border border-black"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <img src={`${recipe.image}`} className="h-32 w-36" />
          <h1>{recipe.title}</h1>
          <h2>{recipe.category}</h2>
          <GoHeartFill
            className="h-10 w-10 fill-white stroke-red-500 stroke-[1px]"
            onClick={handleSave}
          />
        </div>
      )}
    </Draggable>
  );
};

export default RecipeCard;
