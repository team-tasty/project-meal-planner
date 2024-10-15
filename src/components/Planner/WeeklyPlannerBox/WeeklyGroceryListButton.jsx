import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WeeklyGroceryListButton = () => {
  const navigate = useNavigate();

  const handleGeneratelist = () => {
    // make backend call to single grocery list endpoint

    navigate("/app/groceryList");
  };
  return (
    <div>
      <button onClick={handleGeneratelist}>Generate Grocery List</button>
    </div>
  );
};

export default WeeklyGroceryListButton;
