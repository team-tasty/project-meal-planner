import axios from "axios";

const AddWeeklyPlannerButton = () => {
  const handleAddWeek = () => {
    // make backend call to add another week
  };
  return (
    <div>
      <button onClick={handleAddWeek}>+ Add Week</button>
    </div>
  );
};

export default AddWeeklyPlannerButton;
