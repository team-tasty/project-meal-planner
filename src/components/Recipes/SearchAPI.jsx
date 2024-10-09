import { useState } from "react";

const SearchAPI = ({ setRecipesData }) => {
  // set state values
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("");

  // create function to handle search
  const handleSearch = async (e) => {
    e.preventDefault();

    // create body object
    const searchInfo = {
      searchInput,
      searchType,
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
    <form>
      <label htmlFor="search"></label>
      <input
        type="text"
        placeholder="Search recipes"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {/* start here Thursday */}
      <label htmlFor="dropDown"></label>
      <select></select>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchAPI;
