import axios from "axios";

const AddWeeklyPlannerButton = () => {
  const handleAddWeek = async () => {
    // make backend call to add another week
    const res = await axios.get("/api/add-week");
  };
  return (
    <div>
      <button onClick={handleAddWeek}>+ Add Week</button>
    </div>
  );
};

export default AddWeeklyPlannerButton;
