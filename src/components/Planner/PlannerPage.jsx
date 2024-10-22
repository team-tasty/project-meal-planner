import WeeklyPlannerBox from "./WeeklyPlannerBox/WeeklyPlannerBox.jsx";
import UserRecipes from "./UserRecipes/UserRecipes.jsx";
import { DragDropContext } from "@hello-pangea/dnd";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import AddWeeklyPlannerButton from "./WeeklyPlannerBox/AddWeeklyPlannerButton.jsx";
import FullGroceryListButton from "./WeeklyPlannerBox/FullGroceryListButton.jsx";

const PlannerPage = () => {
  // get userRecipes from a loader function?
  const [userRecipes, setUserRecipes] = useState(useLoaderData().userRecipes);
  const [userWeeks, setUserWeeks] = useState(useLoaderData().userWeeks);
  const daysData = useLoaderData().daysData;

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
    const recipeId = +result.draggableId;
    const idArray = destination.droppableId.split("-");
    const weekId = +idArray[0];
    const dayId = +idArray[1];

    const dayArrayLength = userWeeks
      .filter((week) => week.weekId === weekId)[0]
      .weekMeals.filter((weekMeals) => weekMeals.dayId === dayId).length;

    // set request to update the db
    // make a call to add a weakMeal entry (will need recipeId, weekId, dayId in the body obj)
    const bodyObj = {
      recipeId,
      weekId,
      dayId,
    };
    // logic to prevent adding more that 3 recipes to a day
    if (dayArrayLength < 3) {
      const res = await axios.post("/api/add-week-meal/", bodyObj);

      if (res.data.success) {
        setUserWeeks(res.data.userWeeks);
      }
    }
  };

  // handle a delettion from list 2 (plannedRecipes)
  const handleDelete = async (weekMealId) => {
    // need a calla to the backend to update the db?
    // make a call to remove recipe from the weakMeals (will need weakMealId)
    const res = await axios.delete(`/api/delete-week-meal/${weekMealId}`);
    if (res.data.success) {
      // if successfull setUserWeeks to res.data.updatedUserWeeks
      setUserWeeks(res.data.userWeeks);
    }
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="">
        <div className="flex flex-col justify-around items-center h-[90vh] box-border lg:justify-around lg:flex lg:flex-row-reverse lg:items-start">
          <UserRecipes
            userRecipes={userRecipes}
            setUserRecipes={setUserRecipes}
          />

          <WeeklyPlannerBox
            handleDelete={handleDelete}
            userWeeks={userWeeks}
            setUserWeeks={setUserWeeks}
            daysData={daysData}
            handleOnDragEnd={handleOnDragEnd}
          />

          <div className="flex justify-center items-center gap-4 h-[5vh] lg:fixed lg:bottom-0">
            <AddWeeklyPlannerButton
              setUserWeeks={setUserWeeks}
              userWeeks={userWeeks}
            />
            <FullGroceryListButton />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default PlannerPage;
