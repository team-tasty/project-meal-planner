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
      <div className="flex justify-center items-center pb-2 border-b-[1px] border-lineGreen">
        <form className="flex items-center" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search recipes"
            value={searchInput}
            className="w-40 h-6"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            className="text-xs lg:text-sm h-6 flex items-center"
            type="submit"
          >
            Search
          </button>
        </form>
        <AddUserRecipeButton />
      </div>
    </>
  );
};

export default SearchAPI;
