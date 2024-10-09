import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="h-[10vh] border border-black flex justify-around items-center">
      <NavLink to="/userLandingPage">Home</NavLink>
      <NavLink to="/recipes">Recipes</NavLink>
      <NavLink to="/planner">Weekly Planner</NavLink>
      <NavLink to="/groceryList">Grocery List</NavLink>
      <button>Logout</button>
    </div>
  );
};

export default Header;
