import WeeklyPlannerBox from "./WeeklyPlannerBox/WeeklyPlannerBox.jsx";
import UserRecipes from "./UserRecipes/UserRecipes.jsx";
import { DragDropContext } from "react-beautiful-dnd";

const PlannerPage = () => {
  return (
    <DragDropContext>
      <div className="flex justify-between h-[90vh] border border-black">
        <div>
          Weekly Planner
          <WeeklyPlannerBox />
        </div>
        <div>
          <UserRecipes />
        </div>
      </div>
    </DragDropContext>
  );
};

export default PlannerPage;
