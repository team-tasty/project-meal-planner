import axios from "axios";

const ResetWeeklyPlannerButton = () => {
  const handleResetWeek = async (weekId) => {
    // make backend call to reset the week
    const res = await axios.delete("/api/reset-week/:weekId");
  };
  return (
    <div>
      <button onClick={handleResetWeek}>Reset Weekly Planner</button>
    </div>
  );
};

export default ResetWeeklyPlannerButton;
