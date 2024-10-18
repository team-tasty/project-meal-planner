import axios from "axios";

const AddWeeklyPlannerButton = ({ setUserWeeks }) => {
  const handleAddWeek = async () => {
    // make backend call to add another week
    const res = await axios.get("/api/add-week");

    console.log(res.data);
    if (res.data.success) {
      setUserWeeks(res.data.userWeeks);
    }
  };
  return (
    <div>
      <button onClick={handleAddWeek}>+ Add Week</button>
    </div>
  );
};

export default AddWeeklyPlannerButton;
