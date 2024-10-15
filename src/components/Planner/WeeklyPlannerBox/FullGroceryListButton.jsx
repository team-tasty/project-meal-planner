import { useNavigate } from "react-router-dom";
import axios from "axios";

const FullGroceryListButton = () => {
  const navigate = useNavigate();

  const handleGeneratelist = () => {
    // make axios call to backend to multiple weeks grocery list endpoint

    navigate("/app/groceryList");
  };
  return (
    <div>
      <button onClick={handleGeneratelist}>Get Full Grocery List</button>
    </div>
  );
};

export default FullGroceryListButton;
