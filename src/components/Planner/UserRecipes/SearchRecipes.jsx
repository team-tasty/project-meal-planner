import { useState } from "react";
import RecipeCard from "../../Recipes/RecipeCard";
import { Draggable } from "@hello-pangea/dnd";
import RecipeModal from "../../Recipes/RecipeModal";

const SearchRecipes = ({ recipesData, setRecipesData }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState(recipesData);
  const [displayModal, setDisplayModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  console.log(recipesData);

  // create a function to handle search and filter data
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchInput(term);

    const filtered = recipesData.filter((recipe) => {
      console.log(recipe);
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
              modalData={modalData}
              recipesData={recipesData}
              setRecipesData={setRecipesData}
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
      {displayModal && (
        <RecipeModal setDisplayModal={setDisplayModal} modalData={modalData} />
      )}
      {recipeCards}
    </div>
  );
};

export default SearchRecipes;
