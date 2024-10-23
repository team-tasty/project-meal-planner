import WeeklyPlanner from "./WeeklyPlanner";

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
      <div className="time-picker-scrollbar flex flex-col w-[95vw] h-[50vh] max-w-[600px] lg:h-[80vh] lg:w-[40vw] items-center mt-1 lg:mt-6 overflow-auto border border-black rounded-md">
        {weeklyPlanners}
      </div>
    </div>
  );
};

export default WeeklyPlannerBox;
