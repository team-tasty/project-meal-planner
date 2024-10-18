import WeeklyPlannerBox from "./WeeklyPlannerBox/WeeklyPlannerBox.jsx";
import UserRecipes from "./UserRecipes/UserRecipes.jsx";
import { DragDropContext } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

const PlannerPage = () => {
  // get userRecipes from a loader function?
  const [userRecipes, setUserRecipes] = useState(useLoaderData().userRecipes);
  const [userWeeks, setUserWeeks] = useState(useLoaderData().userWeeks);
  const daysData = useLoaderData().daysData;
  console.log("USER WEEKS:", userWeeks);

  console.log(userWeeks[0].weekMeals); // one week's planned meals

  // const initialPlannedRecipes = [[], [], [], [], [], [], []];

  // // const [userRecipes] = useState(initialUserRecipes);
  // const [plannedRecipes, setPlannedRecipes] = useState(initialPlannedRecipes);

  const handleOnDragEnd = async (result) => {
    const { source, destination } = result;

    // if dropped outside of any droppable, do nothing
    if (!destination) return;
    // If the item is dropped in the same place, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    //Get the source list (userRecipes)
    const sourceList = userRecipes;
    const draggedItem = sourceList[source.index];

    // Add the item to list 2 (plannedRecipes)

    const newPlannedRecipes = [...plannedRecipes];

    if (newPlannedRecipes[+destination.droppableId - 1].length < 3) {
      newPlannedRecipes[+destination.droppableId - 1].push(draggedItem);
    }

    // set request to update the db
    // make a call to add a weakMeal entry (will need recipeId, weekId, dayId in the body obj)
    const res = await axios.post("/api/add-week-meal/");

    // set state setUserWeeks to res.data.updatedUserWeeks
    setPlannedRecipes(newPlannedRecipes);
  };

  // handle a delettion from list 2 (plannedRecipes)
  const handleDelete = (dayIndex, recipeIndex) => {
    const newPlannedRecipes = [...plannedRecipes];
    newPlannedRecipes[dayIndex].splice(recipeIndex, 1);
    // need a calla to the backend to update the db?
    // make a call to remove recipe from the weakMeals (will need weakMealId)
    // if successfull setUserWeeks to res.data.updatedUserWeeks
    setPlannedRecipes(newPlannedRecipes);
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="flex justify-between h-[90vh]">
        <div>
          Weekly Planner
          <div className="flex justify-between w-[98vw]">
            <WeeklyPlannerBox
              // plannedRecipes={plannedRecipes}
              handleDelete={handleDelete}
              userWeeks={userWeeks}
              setUserWeeks={setUserWeeks}
              daysData={daysData}
            />
            <UserRecipes
              userRecipes={userRecipes}
              setUserRecipes={setUserRecipes}
            />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default PlannerPage;
