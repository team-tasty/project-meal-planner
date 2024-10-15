import axios from "axios";

const RemoveWeeklyPlannerButton = () => {
  const handleRemoveWeek = () => {
    // make backend call to remove current week
  };

  return (
    <div>
      <button onClick={handleRemoveWeek}>- Remove Current Week</button>
    </div>
  );
};

export default RemoveWeeklyPlannerButton;
