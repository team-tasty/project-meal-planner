import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";

const Header = () => {
  const userId = useSelector((state) => state.userId);
  console.log(userId);

  return (
    <div className="h-[10vh] border-b-[1px] border-black flex justify-around items-center">
       <img src="../../public/pantryPlannerLogo-removebg-preview.png" alt="Pantry Plan Logo" 
          className="h-[14vh]"
        />
      <NavLink 
        to="/app/home"
        className={({ isActive }) =>
          isActive || location.pathname === "/" ?
          "headerLinkActive"
          : "headerLink"
        }
      >Home
      </NavLink>
      <NavLink 
        to="/app/recipes"
        className={({ isActive }) => 
          isActive ? "headerLinkActive"
          : "headerLink"
        }
      >Recipes
      </NavLink>
      <NavLink 
        to="/app/planner"
        className={({ isActive }) => 
          isActive ? "headerLinkActive"
          : "headerLink"
        }
      >Weekly Planner
      </NavLink>
      <NavLink 
        to="/app/groceryList"
        className={({ isActive }) => 
          isActive ? "headerLinkActive"
          : "headerLink"
        }  
      >Grocery List</NavLink>
      {userId && <LogoutButton />}
    </div>
  );
};

export default Header;
