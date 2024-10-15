import { useNavigate } from "react-router-dom";

const AddUserRecipeButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/app/addRecipe")}>
      + Add Your Own Recipe
    </button>
  );
};

export default AddUserRecipeButton;
