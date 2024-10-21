import { useState } from "react";
import axios from "axios";
import AddUserRecipeButton from "./AddUserRecipeButton";

const SearchAPI = ({ setRecipesData }) => {
  // set state values
  const [searchInput, setSearchInput] = useState("");
  // const [searchType, setSearchType] = useState("");

  // create function to handle search
  const handleSearch = async (e) => {
    e.preventDefault();

    // Connect to backend, may need to tweak once we have all the info

    // create body object
    const searchInfo = {
      searchInput,
      // searchType,
    };

    // make call to backend endpoint
    const res = await axios.post("/api/recipe-search", searchInfo);

    // if successful -- setRecipeData will = the new recipeData from the axios call, if not -- display message
    if (res.data.success) {
      setRecipesData(res.data.recipesData);
    } else {
      return <p>{res.data.message}</p>;
    }
  };

  return (
    <>
    <div className="flex justify-center pb-2 border-b-[1px] border-lineGreen">
      <div className="flex flex-row items-start flex-wrap justify-center"> 
        <form onSubmit={handleSearch}>
          {/* <label htmlFor="search"></label> */}
          <input
            type="text"
            placeholder="Search recipes"
            value={searchInput}
            className="mx-[3px] mb-2"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {/* Search by dropdown */}
          {/* <label htmlFor="dropDown">Search By:</label>
          <select
            value={searchType}
            required
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="" disabled></option>
            <option value="s">Title</option>
            <option value="i">Ingredient</option>
            <option value="c">Category</option>
            <option value="a">Area</option>
          </select> */}
          <button type="submit">Search</button>
        </form>
        <div className="flex item-stretch h-[28px]">
          <AddUserRecipeButton />
        </div>
      </div>
    </div>
    </>
  );
};

export default SearchAPI;
