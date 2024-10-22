import { useState } from "react";
import RecipeCard from "../../Recipes/RecipeCard";
import { Draggable } from "@hello-pangea/dnd";
import RecipeModal from "../../Recipes/RecipeModal";
import AddUserRecipeButton from "../../Recipes/AddUserRecipeButton";

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
              className=""
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
    <div className="flex flex-col items-center">
      <div className="flex justify-center pb-2 mb-2 border-b-[1px] border-lineGreen">
        <form className="flex items-center">
          <label htmlFor="search"></label>
          <input
            className="w-40 h-6"
            type="text"
            placeholder="Search recipes"
            value={searchInput}
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
        {displayModal && (
          <RecipeModal
            setDisplayModal={setDisplayModal}
            modalData={modalData}
          />
        )}
      </div>
      <div className="flex flex-col w-[70vw] lg:w-[26vw] max-w-[400px]">
        {recipeCards}
      </div>
    </div>
  );
};

export default SearchRecipes;
