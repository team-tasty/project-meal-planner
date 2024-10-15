import WeeklyPlanner from "./WeeklyPlanner";
import AddWeeklyPlannerButton from "./AddWeeklyPlannerButton";
import CreateListButton from "./FullGroceryListButton";

const WeeklyPlannerBox = ({ plannedRecipes, handleDelete }) => {
  return (
    <div className="border border-green-800">
      <WeeklyPlanner
        plannedRecipes={plannedRecipes}
        handleDelete={handleDelete}
      />
      <div className="flex justify-center gap-4">
        <AddWeeklyPlannerButton />
        <CreateListButton />
      </div>
    </div>
  );
};

export default WeeklyPlannerBox;
