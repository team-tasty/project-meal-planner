import { Droppable, Draggable } from "@hello-pangea/dnd";
import RecipeCard from "../../Recipes/RecipeCard";
import { useState } from "react";

const DayDrop = ({ day, dayRecipes }) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  console.log(day);
  console.log(dayRecipes);

  // map over dayRecipes and render the recipeCards for each recipe
  const recipeCards = dayRecipes.map((recipe, index) => {
    return (
      <Draggable
        key={recipe.recipeId}
        draggableId={recipe.recipeId + ""}
        index={index}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="border border-orange-500 h-60 w-96"
          >
            <RecipeCard
              key={recipe.recipeId}
              index={index}
              recipe={recipe}
              setModalData={setModalData}
              displayModal={displayModal}
              setDisplayModal={setDisplayModal}
            />
          </div>
        )}
      </Draggable>
    );
  });

  return (
    <Droppable droppableId={`${day.dayId}`}>
      {(provided) => (
        <div
          className="h-[350px] w-[800px] border border-black"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2>{day.day}:</h2>
          {recipeCards}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DayDrop;
