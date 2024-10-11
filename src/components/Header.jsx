import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";

const Header = () => {
  const userId = useSelector((state) => state.userId);
  console.log(userId);

  return (
    <div className="h-[10vh] border border-black flex justify-around items-center">
      <NavLink to="/app/home">Home</NavLink>
      <NavLink to="/app/recipes">Recipes</NavLink>
      <NavLink to="/app/planner">Weekly Planner</NavLink>
      <NavLink to="/app/groceryList">Grocery List</NavLink>
      {userId && <LogoutButton />}
    </div>
  );
};

export default Header;
