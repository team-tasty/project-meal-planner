import ResetWeeklyPlannerButton from "./ResetWeeklyPlannerButton";
import RemoveWeeklyPlannerButton from "./RemoveWeeklyPlannerButton";
import DayDrop from "./DayDrop";
import axios from "axios";
import { useState, useEffect } from "react";
import WeeklyGroceryListButton from "./WeeklyGroceryListButton";

const WeeklyPlanner = ({
  plannedRecipes,
  handleDelete,
  userWeeks,
  setUserWeeks,
  daysData,
}) => {
  // set state values
  // const [daysData, setDaysData] = useState([
  //   { dayId: 1, day: "Day 1" },
  //   { dayId: 2, day: "Day 2" },
  //   { dayId: 3, day: "Day 3" },
  //   { dayId: 4, day: "Day 4" },
  //   { dayId: 5, day: "Day 5" },
  //   { dayId: 6, day: "Day 6" },
  //   { dayId: 7, day: "Day 7" },
  // ]);
  console.log(userWeeks);
  console.log(plannedRecipes);
  // map over plannedRecipes will give us each object (weekMeal) in that week

  const dayCards = daysData.map((day, index) => {
    const recipeObjs = plannedRecipes.filter((recipe) => {
      return recipe.day.dayId === day.dayId;
    });

    console.log(`days recipe objects:`, recipeObjs);

    return (
      <DayDrop
        key={day.dayId}
        day={day}
        dayRecipes={recipeObjs}
        handleDelete={handleDelete}
        dayIndex={index}
      />
    );
  });

  // make a backend call to get days within a useEffect?
  useEffect(() => {
    const populateDays = async () => {
      const res = await axios.get("/api/getDays");

      if (res.data.success) {
        setDaysData(res.data.days);
      }
    };
  }, []);

  return (
    <div className="border border-blue-800">
      {dayCards}
      <div className="flex justify-center gap-4">
        <ResetWeeklyPlannerButton />
        <RemoveWeeklyPlannerButton />
        <WeeklyGroceryListButton />
      </div>
    </div>
  );
};

export default WeeklyPlanner;
