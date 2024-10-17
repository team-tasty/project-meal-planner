import { useNavigate } from "react-router-dom";
import axios from "axios";

const FullGroceryListButton = () => {
  const navigate = useNavigate();

  const handleGeneratelist = async () => {
    // make axios call to backend to multiple weeks grocery list endpoint
    const res = await axios.get("/api/grocery-list");

    navigate("/app/groceryList");
  };
  return (
    <div>
      <button onClick={handleGeneratelist}>Get Full Grocery List</button>
    </div>
  );
};

export default FullGroceryListButton;
