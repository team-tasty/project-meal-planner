import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";
import { HiOutlineMenu } from "react-icons/hi";
import { useState } from "react";


const Header = () => {
  const userId = useSelector((state) => state.userId);
  // console.log(userId);

  const [ showMenu, setShowMenu ] = useState(false);

  return (
    <>
      {/* Mobile View */}
      <div className="lg:hidden h-[10vh] border-b-[1px] border-black flex justify-around items-center sticky top-0 bg-white">
        {/* <HiOutlineMenu size={25} onClick={() => setShowMenu(!showMenu)} />
        <img
          src="../../public/PPLogo-no-bg.png"
          alt="Pantry Plan Logo"
          className="h-[10vh]"
        /> */}
        <div className="flex justify-between w-full">
          <div className="flex items-center mx-8">
            <HiOutlineMenu size={25} onClick={() => setShowMenu(!showMenu)} />
          </div>
          <div className="flex items-center mx-8">
            <img
              src="../../public/PPLogo-no-bg.png"
              alt="Pantry Plan Logo"
              className="h-[10vh]"
            />
          </div>
        </div>
        {showMenu &&
          <div className="absolute top-[10vh] left-0 right-0 bg-white flex flex-col items-center border-b-[1px] border-black py-6">
            <NavLink
              to="/app/home"
              className={({ isActive }) =>
                isActive || location.pathname === "/"
                  ? "headerLinkActive"
                  : "headerLink"
              }
              onClick={() => setShowMenu(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/app/recipes"
              className={({ isActive }) =>
                isActive ? "headerLinkActive" : "headerLink"
              }
              onClick={() => setShowMenu(false)}
            >
              Recipes
            </NavLink>

            <NavLink
              to="/app/planner"
              className={({ isActive }) =>
                isActive ? "headerLinkActive" : "headerLink"
              }
              onClick={() => setShowMenu(false)}
            >
              Weekly Planner
            </NavLink>

            <NavLink
              to="/app/groceryList"
              className={({ isActive }) =>
                isActive ? "headerLinkActive" : "headerLink"
              }
              onClick={() => setShowMenu(false)}
            >
              Grocery List
            </NavLink>

            <LogoutButton onClick={() => setShowMenu(false)} /> 
          </div>
        }
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex h-[10vh] border-b-[1px] border-black  justify-around items-center sticky top-0 bg-white">
        <img
          src="../../public/PPLogo-no-bg.png"
          alt="Pantry Plan Logo"
          className="h-[10vh]"
        />
        <NavLink
          to="/app/home"
          className={({ isActive }) =>
            isActive || location.pathname === "/"
              ? "headerLinkActive"
              : "headerLink"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/app/recipes"
          className={({ isActive }) =>
            isActive ? "headerLinkActive" : "headerLink"
          }
        >
          Recipes
        </NavLink>
        <NavLink
          to="/app/planner"
          className={({ isActive }) =>
            isActive ? "headerLinkActive" : "headerLink"
          }
        >
          Weekly Planner
        </NavLink>
        <NavLink
          to="/app/groceryList"
          className={({ isActive }) =>
            isActive ? "headerLinkActive" : "headerLink"
          }
        >
          Grocery List
        </NavLink>
        <LogoutButton />
      </div>
    </>
  );
};

export default Header;
