import { useState } from "react";
import RecipeCard from "../../Recipes/RecipeCard";

const SearchRecipes = ({ recipesData }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState(recipesData);

  // create a function to handle search and filter data
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchInput(term);

    const filtered = recipesData.filter((recipe) => {
      return recipe.title.toLowerCase().includes(term.toLowerCase());
    });

    setFilteredData(filtered);
  };

  const recipeCards = filteredData.map((recipe) => {
    return <RecipeCard key={recipe.recipeId} recipe={recipe} />;
  });

  return (
    <div>
      <form>
        <label htmlFor="search"></label>
        <input
          type="text"
          placeholder="Search recipes"
          value={searchInput}
          onChange={handleSearch}
        />
        <button type="submit">Search</button>
      </form>
      {recipeCards}
    </div>
  );
};

export default SearchRecipes;
