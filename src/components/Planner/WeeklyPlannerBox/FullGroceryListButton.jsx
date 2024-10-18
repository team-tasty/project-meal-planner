import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
const FullGroceryListButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGeneratelist = async () => {
    // make axios call to backend to multiple weeks grocery list endpoint
    const res = await axios.get("/api/grocery-list");
    console.log(res.data);
    if (res.data.success) {
      dispatch({
        type: "UPDATE_GROCERY_LIST",
        payload: res.data.groceryList,
      });
      navigate("/app/groceryList");
    }
  };
  return (
    <div>
      <button onClick={handleGeneratelist}>Get Full Grocery List</button>
    </div>
  );
};

export default FullGroceryListButton;
