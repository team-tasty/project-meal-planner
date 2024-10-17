import axios from "axios";

const RemoveWeeklyPlannerButton = () => {
  const handleRemoveWeek = async (weekId) => {
    // make backend call to remove current week
    const res = await axios.delete("/api/delete-week/:weekId");
  };

  return (
    <div>
      <button onClick={handleRemoveWeek}>- Remove Current Week</button>
    </div>
  );
};

export default RemoveWeeklyPlannerButton;
