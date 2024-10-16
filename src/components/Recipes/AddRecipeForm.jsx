import { useState } from "react";
import unitConvert from "../../../functions/unitConvert";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddRecipeForm = () => {
  // set state values for form inputs
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [area, setArea] = useState("");
  const [instruction, setInstruction] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [name, setName] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [isAddingNewIngredient, setIsAddingNewIngredient] = useState(false);

  const navigate = useNavigate();

  const handleAddIngredient = () => {
    // run unit through converter function
    const strUnitArr = unit.match(/[a-z]+/gi);
    const convertedUnit = unitConvert(strUnitArr);

    // create ingredient object
    const ingredientObj = {
      measurementQuantity: {
        quantity: quantity,
      },
      measurementUnit: {
        unit: convertedUnit,
      },
      ingredient: {
        ingredient: name,
      },
    };

    // push ingredient object to ingredients array
    const newIngredients = [...recipeIngredients];
    newIngredients.push(ingredientObj);

    setRecipeIngredients(newIngredients);

    // reset unit, quanitity, name state values
    setUnit("");
    setQuantity("");
    setName("");
    // set show to false
    setIsAddingNewIngredient(false);
  };

  // function to cancel adding an ingredient
  const handleCancelIngredient = () => {
    // reset all values
    setUnit("");
    setQuantity("");
    setName("");
    // set show to false
    setIsAddingNewIngredient(false);
  };

  // function to delete ingredient once saved
  const handleDeleteIngredient = (index) => {
    // remove the chosen ingredient from the ingredients array
    const newIngredients = [...recipeIngredients];
    newIngredients.splice(index, 1);
    setRecipeIngredients(newIngredients);
  };

  console.log(recipeIngredients);

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    // create body object
    const recipeObj = {
      title,
      instruction,
      image,
      category,
      area,
      tag,
      recipeIngredients,
    };
    // make backend call to add a user recipe to the db and save it to user
    const res = await axios.post("/api/create-recipe", { recipeObj });

    console.log(res.data);

    // if succesfful
    if (res.data.success) {
      navigate(-1);
    } else {
      return <p>{res.data.message}</p>;
    }
  };

  // display ingredients list
  const ingredientList = recipeIngredients.map((ingredient, index) => {
    if (!ingredient.measurementQuantity.quantity) {
      return (
        <li key={`${ingredient.ingredient.ingreident}${index}`}>
          {ingredient.measurementUnit.unit} {ingredient.ingredient.ingredient}
          <button onClick={(e) => handleDeleteIngredient(index)}>Trash</button>
        </li>
      );
    } else if (ingredient.measurementUnit.unit === "null") {
      return (
        <li key={`${ingredient.ingredient.ingredient}${index}`}>
          {ingredient.measurementQuantity.quantity}{" "}
          {ingredient.ingredient.ingredient}
          <button onClick={(e) => handleDeleteIngredient(index)}>Trash</button>
        </li>
      );
    } else {
      return (
        <li key={`${ingredient.ingredient.ingredient}${index}`}>
          {ingredient.measurementQuantity.quantity}{" "}
          {ingredient.measurementUnit.unit} {ingredient.ingredient.ingredient}
          <button onClick={(e) => handleDeleteIngredient(index)}>Trash</button>
        </li>
      );
    }
  });
  return (
    <div className="">
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
          type="url"
          placeholder="https://www.glorioustreats.com.jpg"
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
        {ingredientList}
        {!isAddingNewIngredient && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsAddingNewIngredient(!isAddingNewIngredient);
            }}
            type="button"
          >
            + Add Ingredient
          </button>
        )}
        {isAddingNewIngredient && (
          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              value={quantity}
              type="number"
              min={0}
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

            <button onClick={handleCancelIngredient} type="button">
              Cancel
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddIngredient();
              }}
              type="button"
            >
              Save Ingredient
            </button>
          </div>
        )}
        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
