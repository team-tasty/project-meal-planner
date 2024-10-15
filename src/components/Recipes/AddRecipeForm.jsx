import { useState } from "react";

const AddRecipeForm = () => {
  // set state values for form inputs
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [area, setArea] = useState("");
  const [instruction, setInstruction] = useState("");

  const handleAddRecipe = () => {
    // make backend call to add a user recipe to the db and save it to user
  };
  return (
    <div>
      Add your own recipe form:
      <form onSubmit={handleAddRecipe}>
        <label htmlFor="title">Recipe Title</label>
        <input
          value={title}
          type="text"
          placeholder="Recipe Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="image">Image URL</label>
        <input
          value={image}
          type="text"
          placeholder="Recipe Image"
          required
          onChange={(e) => setImage(e.target.value)}
        />
      </form>
    </div>
  );
};

export default AddRecipeForm;
