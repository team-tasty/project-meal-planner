import { useNavigate } from "react-router-dom";

const AddUserRecipeButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="text-xs h-6 lg:text-sm flex items-center"
      onClick={() => navigate("/app/addRecipe")}
    >
      Add Your Own
    </button>
  );
};

export default AddUserRecipeButton;
