import WeeklyPlannerBox from "./WeeklyPlannerBox/WeeklyPlannerBox.jsx";
import UserRecipes from "./UserRecipes/UserRecipes.jsx";
import { DragDropContext } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

const PlannerPage = () => {
  // get userRecipes from a loader function?
  const [userRecipes, setUserRecipes] = useState(useLoaderData().userRecipes);
  const [userWeeks, setUserWeeks] = useState(useLoaderData().userWeeks);
  // const initialUserRecipes = [
  //   {
  //     recipeId: 1,
  //     title: "Chicken Alfredo",
  //     image:
  //       "https://borrowedbites.com/wp-content/uploads/2024/01/Square-One-Pot-Chicken-Alfredo.jpg",
  //     category: "Pasta",
  //     instruction:
  //       "Cook the pasta according to the box instructions. While the pasta is cooking, prepare the sauce by...",
  //     tag: "noodles,dinner,poultry",
  //     area: "Italian",
  //     recipeIngredients: [
  //       {
  //         measurementQuantity: {
  //           quantity: 2,
  //         },
  //         measurementUnit: {
  //           unit: "tbsp",
  //         },
  //         ingredient: {
  //           ingredient: "cajun",
  //         },
  //       },
  //       {
  //         measurementQuantity: {
  //           quantity: 1,
  //         },
  //         measurementUnit: {
  //           unit: "tsp",
  //         },
  //         ingredient: {
  //           ingredient: "cayenne pepper",
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     recipeId: 2,
  //     title: "Brownies",
  //     image:
  //       "https://mytxkitchen.com/wp-content/uploads/2022/08/Fudgy-Chocolate-Brownies-4-500x375.jpg",
  //     category: "Desserts",
  //     instruction:
  //       "Prepare the brownies according to the box instructions. While the brownies are baking...",
  //     tag: null,
  //     area: "American",
  //     recipeIngredients: [
  //       {
  //         measurementQuantity: {
  //           quantity: 3,
  //         },
  //         measurementUnit: {
  //           unit: "tsp",
  //         },

  //         ingredient: {
  //           ingredient: "sugar",
  //         },
  //       },
  //       {
  //         measurementQuantity: {
  //           quantity: 2,
  //         },
  //         measurementUnit: {
  //           unit: "large",
  //         },
  //         ingredient: {
  //           ingredient: "eggs",
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     recipeId: 3,
  //     title: "Cookies",
  //     image:
  //       "https://images.aws.nestle.recipes/resized/5b069c3ed2feea79377014f6766fcd49_Original_NTH_Chocolate_Chip_Cookie_1080_850.jpg",
  //     category: "Desserts",
  //     instruction:
  //       "Prepare the brownies according to the box instructions. While the brownies are baking...",
  //     tag: null,
  //     area: "American",
  //     recipeIngredients: [
  //       {
  //         measurementQuantity: {
  //           quantity: 3,
  //         },
  //         measurementUnit: {
  //           unit: "tsp",
  //         },

  //         ingredient: {
  //           ingredient: "sugar",
  //         },
  //       },
  //       {
  //         measurementQuantity: {
  //           quantity: 2,
  //         },
  //         measurementUnit: {
  //           unit: "large",
  //         },
  //         ingredient: {
  //           ingredient: "eggs",
  //         },
  //       },
  //     ],
  //   },
  // ];

  const [daysData, setDaysData] = useState([
    { dayId: 1, day: "Day 1" },
    { dayId: 2, day: "Day 2" },
    { dayId: 3, day: "Day 3" },
    { dayId: 4, day: "Day 4" },
    { dayId: 5, day: "Day 5" },
    { dayId: 6, day: "Day 6" },
    { dayId: 7, day: "Day 7" },
  ]);

  const initialPlannedRecipes = [[], [], [], [], [], [], []];

  // const [userRecipes] = useState(initialUserRecipes);
  const [plannedRecipes, setPlannedRecipes] = useState(initialPlannedRecipes);

  const handleOnDragEnd = (result) => {
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

    // set state
    setPlannedRecipes(newPlannedRecipes);
  };

  // handle a delettion from list 2 (plannedRecipes) NEED HELP HERE
  const handleDelete = (dayIndex, recipeIndex) => {
    const newPlannedRecipes = [...plannedRecipes];
    newPlannedRecipes[dayIndex].splice(recipeIndex, 1);
    // need a calla to the backend to update the db?
    setPlannedRecipes(newPlannedRecipes);
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="flex justify-between h-[90vh]">
        <div>
          Weekly Planner
          <div className="flex justify-between w-[98vw]">
            <WeeklyPlannerBox
              plannedRecipes={plannedRecipes}
              handleDelete={handleDelete}
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
