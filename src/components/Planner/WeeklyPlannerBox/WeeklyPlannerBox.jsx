import WeeklyPlanner from "./WeeklyPlanner";
import AddWeeklyPlannerButton from "./AddWeeklyPlannerButton";
import CreateListButton from "./CreateListButton";
import ResetAllWeeklyPlannersButton from "./ResetAllWeeklyPlannersButton";
const WeeklyPlannerBox = () => {
  return (
    <div className="border border-green-800">
      <WeeklyPlanner />
      <AddWeeklyPlannerButton />
      <ResetAllWeeklyPlannersButton />
      <CreateListButton />
    </div>
  );
};

export default WeeklyPlannerBox;
