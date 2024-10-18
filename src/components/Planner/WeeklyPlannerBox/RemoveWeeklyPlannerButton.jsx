import axios from "axios";

const RemoveWeeklyPlannerButton = ({ weekId, setUserWeeks }) => {
  const handleRemoveWeek = async () => {
    // make backend call to remove current week
    const res = await axios.delete(`/api/delete-week/${weekId}`);
    console.log(res.data);

    if (res.data.success) {
      setUserWeeks(res.data.userWeeks);
    }
  };

  return (
    <div>
      <button onClick={handleRemoveWeek}>- Remove Current Week</button>
    </div>
  );
};

export default RemoveWeeklyPlannerButton;
