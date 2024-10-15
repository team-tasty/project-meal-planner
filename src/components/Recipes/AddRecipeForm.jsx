import { useState } from "react";

const AddRecipeForm = () => {
  // set state values for form inputs
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [area, setArea] = useState("");
  const [instruction, setInstruction] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState([]);
  const [name, setName] = useState("");
  const [isAddingNewIngredient, setIsAddingNewIngredient] = useState(false);

  const handleAddRecipe = () => {
    // make backend call to add a user recipe to the db and save it to user
  };

  const handleAddIngredient = () => {
    setIsAddingNewIngredient(true);
    const handleDeleteIngredient = () => {};
    return (
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          value={quantity}
          type="number"
          placeholder="2"
          required
          onChange={(e) => setQuantity(e.target.value)}
        />
        <label htmlFor="unit">Unit</label>
        <input
          value={unit}
          type="text"
          pattern="text"
          placeholder="cups"
          required
          onChange={(e) => setUnit(e.target.value)}
        />
        <label htmlFor="name">Name</label>
        <input
          value={name}
          type="text"
          placeholder="flour"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={handleDeleteIngredient}>Trash</button>
      </div>
    );
  };
  return (
    <div>
      Add your own recipe form:
      <form onSubmit={handleAddRecipe}>
        <label htmlFor="title">Recipe Title</label>
        <input
          value={title}
          type="text"
          placeholder="Chocolate chip cookies"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="image">Image URL</label>
        <input
          value={image}
          type="text"
          placeholder="https://www.glorioustreats.com.jpg"
          required
          onChange={(e) => setImage(e.target.value)}
        />
        <label htmlFor="area">Area</label>
        <input
          value={area}
          type="text"
          placeholder="American"
          required
          onChange={(e) => setArea(e.target.value)}
        />
        <label htmlFor="category">Category</label>
        <input
          value={category}
          type="text"
          placeholder="Dessert"
          required
          onChange={(e) => setCategory(e.target.value)}
        />
        <label htmlFor="tag">Tags</label>
        <input
          value={tag}
          type="text"
          placeholder="e.g. baking,chocolate,gooey"
          required
          onChange={(e) => setTag(e.target.value)}
        />
        <label htmlFor="instruction">Cooking Instructions</label>
        <textarea
          value={instruction}
          type="text"
          placeholder="e.g. Preheat the oven to..."
          required
          onChange={(e) => setInstruction(e.target.value)}
          className="border border-black p-2"
        />
        <button onClick={handleAddIngredient} type="button">
          Add Ingredient
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
