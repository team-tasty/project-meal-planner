import { useState } from "react";

const SearchAPI = ({ setRecipeData }) => {
  // set state values
  const [searchInput, setSearchInput] = useState("");

  // create function to handle search
  const handleSearch = async (e) => {
    e.preventDefault();

    // create body object
    const searchValue = {
      searchInput,
    };

    // make call to backend endpoint
    const res = await axios.get("/api/searchAPI", searchValue);

    // if successful -- setRecipeData will = the new recipeData from the axios call, if not -- display message
    if (res.data.success) {
      setRecipeData(res.data.searchResults);
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
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchAPI;
