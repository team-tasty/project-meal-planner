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
  const weeklyPlanners = userWeeks.map((week, index) => (
    <WeeklyPlanner
      key={week.weekId}
      weekId={week.weekId}
      weekNumber={index + 1}
      plannedRecipes={week.weekMeals}
      handleDelete={handleDelete}
      userWeeks={userWeeks}
      setUserWeeks={setUserWeeks}
      daysData={daysData}
      handleOnDragEnd={handleOnDragEnd}
    />
  ));

  return (
    <div>
      <div className="border border-black rounded-md overflow-auto">
        {weeklyPlanners}
      </div>
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
