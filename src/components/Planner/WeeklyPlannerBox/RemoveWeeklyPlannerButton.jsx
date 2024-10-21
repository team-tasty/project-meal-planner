import axios from "axios";

const RemoveWeeklyPlannerButton = ({ weekId, setUserWeeks, userWeeks }) => {
  const handleRemoveWeek = async () => {
    // make backend call to remove current week
    if (userWeeks.length > 1) {
      const res = await axios.delete(`/api/delete-week/${weekId}`);
      console.log(res.data);

      if (res.data.success) {
        setUserWeeks(res.data.userWeeks);
      }
    } else {
      alert("Don't delete your only week!");
    }
  };

  return (
    <div>
      <button className="text-xs lg:text-small" onClick={handleRemoveWeek}>
        Remove Current Week
      </button>
    </div>
  );
};

export default RemoveWeeklyPlannerButton;
