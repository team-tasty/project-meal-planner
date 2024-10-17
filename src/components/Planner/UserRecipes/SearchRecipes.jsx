import { useState } from "react";
import RecipeCard from "../../Recipes/RecipeCard";
import { Draggable } from "@hello-pangea/dnd";
import RecipeModal from "../../Recipes/RecipeModal";

const SearchRecipes = ({ recipesData, setRecipesData }) => {
  const [searchInput, setSearchInput] = useState("");
  const [displayModal, setDisplayModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  const recipeCards = recipesData
    .filter((recipe) => {
      return recipe.recipe.title
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    })
    .map((recipe, index) => {
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
  console.log(recipeCards);

  return (
    <div>
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
      {displayModal && (
        <RecipeModal setDisplayModal={setDisplayModal} modalData={modalData} />
      )}
      {recipeCards}
    </div>
  );
};

export default SearchRecipes;
