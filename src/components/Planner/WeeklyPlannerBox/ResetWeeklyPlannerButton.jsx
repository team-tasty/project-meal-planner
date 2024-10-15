import axios from "axios";

const ResetWeeklyPlannerButton = () => {
  const handleResetWeek = () => {
    // make backend call to reset the week
  };
  return (
    <div>
      <button onClick={handleResetWeek}>Reset Weekly Planner</button>
    </div>
  );
};

export default ResetWeeklyPlannerButton;
