import { Droppable, Draggable } from "@hello-pangea/dnd";
import RecipeCard from "../../Recipes/RecipeCard";
import { useState } from "react";
import RecipeModal from "../../Recipes/RecipeModal";

const DayDrop = ({
  day,
  dayRecipes,
  handleDelete,
  dayIndex,
  userWeeks,
  weekId,
  setUserWeeks,
  handleOnDragEnd,
}) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  // let placeholders = [null, null, null];

  // console.log(day);
  // console.log("DAY RECIPES:", dayRecipes);
  // // console.log(weekId);

  // map over dayRecipes and render the recipeCards for each recipe
  const recipeCards = dayRecipes.map((recipe, index) => {
    return (
      <RecipeCard
        key={recipe.weekMealId}
        index={index}
        dayIndex={dayIndex}
        recipe={recipe}
        setModalData={setModalData}
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        handleDelete={handleDelete}
        weekId={weekId}
        handleOnDragEnd={handleOnDragEnd}
        setUserWeeks={setUserWeeks}
      />
    );
  });

  return (
    <Droppable droppableId={`${weekId}-${day.dayId}`} direction="vertical">
      {(provided) => (
        <div
          className="flex justify-between mx-3 min-h-[100px] lg:w-[35vw]"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="flex items-center">
            <h2>{day.day}:</h2>
          </div>
          <div className="flex flex-col mt-1 pb-2 mb-2 border-b-[1px] w-[70vw] lg:w-[30vw] max-w-[430px] border-lineGreen">
            {recipeCards}
          </div>
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
