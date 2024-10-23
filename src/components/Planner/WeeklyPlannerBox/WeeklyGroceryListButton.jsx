import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const WeeklyGroceryListButton = ({ weekId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGeneratelist = async () => {
    // make backend call to single grocery list endpoint
    const res = await axios.get(`/api/grocery-list/${weekId}`);

    if (res.data.success) {
      dispatch({
        type: "UPDATE_GROCERY_LIST",
        payload: res.data.groceryList,
      });
      navigate("/app/groceryList");
    }
  };
  return (
    <button className="text-xs md:text-sm" onClick={handleGeneratelist}>
      Generate Grocery List
    </button>
  );
};

export default WeeklyGroceryListButton;
