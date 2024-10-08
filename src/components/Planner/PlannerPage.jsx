import WeeklyPlannerBox from "./WeeklyPlannerBox/WeeklyPlannerBox.jsx";
import UserRecipes from "./UserRecipes/UserRecipes.jsx";
import { DragDropContext } from "react-beautiful-dnd";

const PlannerPage = () => {
  return (
    <DragDropContext>
      <div className="flex justify-between h-[90vh] border border-black">
        <div>
          Weekly Planner
          <div className="flex justify-between border border-yellow-400">
            <WeeklyPlannerBox />
            <UserRecipes />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default PlannerPage;
