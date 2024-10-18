import { useState } from "react";
import unitConvert from "../../../functions/unitConvert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegTrashCan } from "react-icons/fa6";

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
  // "flex flex-row mb-2"
  const ingredientList = recipeIngredients.map((ingredient, index) => {
    if (!ingredient.measurementQuantity.quantity) {
      return (
        <li 
          key={`${ingredient.ingredient.ingreident}${index}`}
          className="mb-2 flex before:content-['•'] before:mr-2 before:ms-1 before:self-center max-w-[270px]">
          <h3 className="grow text-wrap me-1">
            {ingredient.measurementUnit.unit} {ingredient.ingredient.ingredient}
          </h3>
          <FaRegTrashCan 
            className="self-center cursor-pointer mx-1 shrink-0"
            onClick={(e) => handleDeleteIngredient(index)}/>
        </li>
      );
    } else if (ingredient.measurementUnit.unit === "null") {
      return (
        <li 
          key={`${ingredient.ingredient.ingredient}${index}`}
          className="mb-2 flex before:content-['•'] before:mr-2 before:ms-1 before:self-center max-w-[270px]">
          <h3 className="grow text-wrap me-1">
            {ingredient.measurementQuantity.quantity}{" "}
            {ingredient.ingredient.ingredient}
          </h3>
          <FaRegTrashCan 
            className="self-center cursor-pointer mx-1 shrink-0"
            onClick={(e) => handleDeleteIngredient(index)}/>
        </li>
      );
    } else {
      return (
        <li 
          key={`${ingredient.ingredient.ingredient}${index}`}
          className="mb-2 flex before:content-['•'] before:mr-2 before:ms-1 before:self-center max-w-[270px]">
            <h3 className="grow text-wrap me-1">
              {ingredient.measurementQuantity.quantity}{" "}
              {ingredient.measurementUnit.unit} {ingredient.ingredient.ingredient}
            </h3>
            <FaRegTrashCan 
              className="self-center cursor-pointer mx-1 shrink-0"
              onClick={(e) => handleDeleteIngredient(index)}/>
        </li>
      );
    }
  });
  return (
    <div className="flex flex-col place-items-center my-4">
      <div className="">
        <h1 className="text-2xl text-center pb-2 mb-2 border-b-[1px] border-lineGreen">Add Your Own Recipe</h1>
        <form 
          className="flex flex-col justify-center"
          onSubmit={handleAddRecipe}>
          <label 
            className="font-montserratMedium mb-1"
            htmlFor="title">Recipe Title*</label>
          <input
            value={title}
            type="text"
            placeholder="Chocolate chip cookies"
            required
            className="mb-2"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label 
            className="font-montserratMedium mb-1"
            htmlFor="category">Category*</label>
          <input
            value={category}
            type="text"
            placeholder="Dessert"
            required
            className="mb-2"
            onChange={(e) => setCategory(e.target.value)}
          />
          <label 
            className="font-montserratMedium mb-1"
            htmlFor="instruction">Cooking Instructions*</label>
          <textarea
            value={instruction}
            type="text"
            placeholder="e.g. Preheat the oven to..."
            required
            className="mb-2"
            onChange={(e) => setInstruction(e.target.value)}
          />
          <label 
            className="font-montserratMedium mb-1"
            htmlFor="image">Image URL</label>
          <input
            value={image}
            type="url"
            placeholder="https://www.glorioustreats.com.jpg"
            className="mb-2"
            onChange={(e) => setImage(e.target.value)}
          />
          <label 
            className="font-montserratMedium mb-1"
            htmlFor="area">Area</label>
          <input
            value={area}
            type="text"
            placeholder="American"
            required
            className="mb-2"
            onChange={(e) => setArea(e.target.value)}
          />
          <label 
            className="font-montserratMedium mb-1"
            htmlFor="tag">Tags</label>
          <input
            value={tag}
            type="text"
            placeholder="e.g. baking,chocolate,gooey"
            required
            className="mb-2"
            onChange={(e) => setTag(e.target.value)}
          />

          <h2 className="pb-2 mb-4 border-b-[1px] border-lineGreen">* = required</h2>
          <ul>
            {ingredientList}
          </ul>
          {!isAddingNewIngredient && (
            <span className="self-center my-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAddingNewIngredient(!isAddingNewIngredient);
                }}
                type="button"
                >
                Add Ingredient
              </button>
            </span>
          )}
          {isAddingNewIngredient && (
            <div className="flex flex-col">
              <label 
                className="font-montserratMedium mb-1"
                htmlFor="quantity">Quantity</label>
              <input
                value={quantity}
                type="number"
                min={0}
                placeholder="2"
                required
                className="mb-2"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <label 
                className="font-montserratMedium mb-1"
                htmlFor="unit">Unit</label>
              <input
                value={unit}
                type="text"
                pattern="text"
                placeholder="cups"
                required
                className="mb-2"
                onChange={(e) => setUnit(e.target.value)}
              />
              <label 
                className="font-montserratMedium mb-1"
                htmlFor="name">Name</label>
              <input
                value={name}
                type="text"
                placeholder="flour"
                required
                className="mb-4"
                onChange={(e) => setName(e.target.value)}
              />
              <span className="self-center mb-2">
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
              </span>
            </div>
          )}
          <h2 className="text-center pb-2 mb-4 border-b-[1px] border-lineGreen">At least 1 ingredient is required</h2>
          <span className="self-center">
            <button type="submit">Submit Recipe</button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;
