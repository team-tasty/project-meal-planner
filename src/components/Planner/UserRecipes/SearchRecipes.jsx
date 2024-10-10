import { useState } from "react";
import RecipeCard from "../../Recipes/RecipeCard";
import { Draggable } from "react-beautiful-dnd";

const SearchRecipes = ({ recipesData }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState(recipesData);
  const [displayModal, setDisplayModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  // create a function to handle search and filter data
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchInput(term);

    const filtered = recipesData.filter((recipe) => {
      return recipe.title.toLowerCase().includes(term.toLowerCase());
    });

    setFilteredData(filtered);
  };

  const recipeCards = filteredData.map((recipe, index) => {
    return (
      <Draggable
        key={recipe.recipeId}
        draggableId={recipe.recipeId + ""}
        index={index}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <RecipeCard
              key={recipe.recipeId}
              index={index}
              recipe={recipe}
              setModalData={setModalData}
              displayModal={displayModal}
              setDisplayModal={setDisplayModal}
            />
          </div>
        )}
      </Draggable>
    );
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
