import WeeklyPlanner from "./WeeklyPlanner";
import AddWeeklyPlannerButton from "./AddWeeklyPlannerButton";
import CreateListButton from "./FullGroceryListButton";

const WeeklyPlannerBox = ({
  // plannedRecipes,
  handleDelete,
  userWeeks,
  setUserWeeks,
  daysData,
  handleOnDragEnd,
}) => {
  // do a map to generate weeklyPlanners to match the number of elements in the array userWeeks (get from parent)
  const weeklyPlanners = userWeeks.map((week) => (
    <WeeklyPlanner
      key={week.weekId}
      weekId={week.weekId}
      plannedRecipes={week.weekMeals}
      handleDelete={handleDelete}
      userWeeks={userWeeks}
      setUserWeeks={setUserWeeks}
      daysData={daysData}
      handleOnDragEnd={handleOnDragEnd}
    />
  ));

  return (
    <div className="border border-green-800">
      {/* <WeeklyPlanner
        plannedRecipes={plannedRecipes}
        handleDelete={handleDelete}
      /> */}
      {weeklyPlanners}
      <div className="flex justify-center gap-4">
        <AddWeeklyPlannerButton
          setUserWeeks={setUserWeeks}
          userWeeks={userWeeks}
        />
        <CreateListButton />
      </div>
    </div>
  );
};

export default WeeklyPlannerBox;
