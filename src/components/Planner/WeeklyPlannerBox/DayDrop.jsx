import { Droppable, Draggable } from "@hello-pangea/dnd";
import RecipeCard from "../../Recipes/RecipeCard";
import { useState } from "react";
import RecipeModal from "../../Recipes/RecipeModal";

const DayDrop = ({ day, dayRecipes, handleDelete, dayIndex }) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  let placeholders = [null, null, null];

  console.log(day);
  console.log("DAY RECIPES:", dayRecipes);

  // map over dayRecipes and render the recipeCards for each recipe
  const recipeCards = placeholders.map((placeholder, index) => {
    return dayRecipes[index] ? (
      // <Draggable
      //   key={recipe.recipeId}
      //   draggableId={recipe.recipeId + ""}
      //   index={index}
      // >
      //   {(provided, snapshot) => (
      // <div
      //   // ref={provided.innerRef}
      //   // {...provided.draggableProps}
      //   // {...provided.dragHandleProps}
      //   className="border border-orange-500 h-60 w-96"
      // >
      <RecipeCard
        key={dayRecipes[index].recipeId}
        index={index}
        dayIndex={dayIndex}
        recipe={dayRecipes[index]}
        setModalData={setModalData}
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        handleDelete={handleDelete}
      />
    ) : (
      <div></div>
      //   )}
      // // </Draggable>
      // <div className="border border-black h-32 w-72 flex items-center justify-center">
      //   Drag Recipe Here
      // </div>
    );
  });

  return (
    <Droppable droppableId={`${day.dayId}`} direction="vertical">
      {(provided) => (
        <div
          className="min-h-20 min-w-[800px] border border-black flex"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="mt-5">
            <h2>{day.day}:</h2>
          </div>
          <div className="flex flex-col mt-5">{recipeCards}</div>
          {displayModal && (
            <RecipeModal
              setDisplayModal={setDisplayModal}
              modalData={modalData}
            />
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DayDrop;
