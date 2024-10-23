import axios from "axios";

const AddWeeklyPlannerButton = ({ setUserWeeks, userWeeks }) => {
  const handleAddWeek = async () => {
    // make backend call to add another week
    if (userWeeks.length <= 3) {
      const res = await axios.get("/api/add-week");

      if (res.data.success) {
        setUserWeeks(res.data.userWeeks);
      }
    } else {
      alert("You already have 4 weeks! Stop being an overachiever.");
    }
  };
  return (
    <div>
      <button onClick={handleAddWeek}>+ Add Week</button>
    </div>
  );
};

export default AddWeeklyPlannerButton;
