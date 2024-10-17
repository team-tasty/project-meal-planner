import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WeeklyGroceryListButton = () => {
  const navigate = useNavigate();

  const handleGeneratelist = async (weekId) => {
    // make backend call to single grocery list endpoint
    const res = await axios.get("/api/grocery-list/:weekId");

    navigate("/app/groceryList");
  };
  return (
    <div>
      <button onClick={handleGeneratelist}>Generate Grocery List</button>
    </div>
  );
};

export default WeeklyGroceryListButton;
