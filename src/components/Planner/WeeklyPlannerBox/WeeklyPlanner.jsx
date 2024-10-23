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
  weekId,
  handleOnDragEnd,
  weekNumber,
}) => {
  const dayCards = daysData.map((day, index) => {
    const weekMealObjs = plannedRecipes.filter((weekMeal) => {
      return weekMeal.day.dayId === day.dayId;
    });

    return (
      <DayDrop
        key={day.dayId}
        day={day}
        dayRecipes={weekMealObjs}
        handleDelete={handleDelete}
        dayIndex={index}
        userWeeks={userWeeks}
        weekId={weekId}
        setUserWeeks={setUserWeeks}
        handleOnDragEnd={handleOnDragEnd}
      />
    );
  });

  return (
    <div className="">
      <div className="flex items-center justify-center">
        <h2 className="font-bold mt-1">Week {weekNumber}</h2>
      </div>
      {dayCards}
      <div className="flex justify-center gap-4 m-2 lg:mt-4 items-stretch">
        <ResetWeeklyPlannerButton weekId={weekId} setUserWeeks={setUserWeeks} />
        <RemoveWeeklyPlannerButton
          weekId={weekId}
          setUserWeeks={setUserWeeks}
          userWeeks={userWeeks}
        />
        <WeeklyGroceryListButton weekId={weekId} />
      </div>
    </div>
  );
};

export default WeeklyPlanner;
