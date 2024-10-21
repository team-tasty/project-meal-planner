import axios from "axios";

const ResetWeeklyPlannerButton = ({ weekId, setUserWeeks }) => {
  const handleResetWeek = async () => {
    // make backend call to reset the week
    const res = await axios.delete(`/api/reset-week/${weekId}`);
    console.log(res.data);

    if (res.data.success) {
      setUserWeeks(res.data.userWeeks);
    }
  };
  return (
    <div>
      <button className="text-xs lg:text-small" onClick={handleResetWeek}>
        Reset Weekly Planner
      </button>
    </div>
  );
};

export default ResetWeeklyPlannerButton;
