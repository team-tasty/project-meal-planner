import SearchRecipes from "./SearchRecipes.jsx";
import { Droppable } from "@hello-pangea/dnd";

const UserRecipes = ({ userRecipes, setUserRecipes }) => {
  return (
    <Droppable droppableId="droppable-user-recipes">
      {(provided) => (
        <div
          className="time-picker-scrollbar flex flex-col w-[95vw] h-[30vh] max-w-[600px] lg:h-[80vh] lg:w-[40vw] items-center mt-1 lg:mt-6 overflow-auto border border-black rounded-md"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2 className="font-bold my-1">Saved Recipes</h2>
          <SearchRecipes
            recipesData={userRecipes}
            setRecipesData={setUserRecipes}
          />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default UserRecipes;
