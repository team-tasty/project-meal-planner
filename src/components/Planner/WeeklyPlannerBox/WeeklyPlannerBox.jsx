import WeeklyPlanner from "./WeeklyPlanner";
import AddWeeklyPlannerButton from "./AddWeeklyPlannerButton";
import CreateListButton from "./CreateListButton";
import ResetAllWeeklyPlannersButton from "./ResetAllWeeklyPlannersButton";

const WeeklyPlannerBox = ({ plannedRecipes, handleDelete }) => {
  return (
    <div className="border border-green-800">
      <WeeklyPlanner
        plannedRecipes={plannedRecipes}
        handleDelete={handleDelete}
      />
      <AddWeeklyPlannerButton />
      <ResetAllWeeklyPlannersButton />
      <CreateListButton />
    </div>
  );
};

export default WeeklyPlannerBox;
