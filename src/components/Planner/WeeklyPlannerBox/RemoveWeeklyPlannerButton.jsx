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
    <button className="text-xs md:text-sm" onClick={handleRemoveWeek}>
      Remove Current Week
    </button>
  );
};

export default RemoveWeeklyPlannerButton;
