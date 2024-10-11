import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Header = () => {
  return (
    <div className="h-[10vh] border border-black flex justify-around items-center">
      <NavLink to="/app/home">Home</NavLink>
      <NavLink to="/app/recipes">Recipes</NavLink>
      <NavLink to="/app/planner">Weekly Planner</NavLink>
      <NavLink to="/app/groceryList">Grocery List</NavLink>
      <LogoutButton />
    </div>
  );
};

export default Header;
