import { useState } from "react";

const RecipeModal = ({ setDisplayModal, modalData }) => {
  // console.log(modalData);
  // console.log(modalData.recipeIngredients);
  // console.log(modalData.recipeIngredients[0]); // first ingredient object
  // console.log(modalData.recipeIngredients[0].measurementQuantity);
  // console.log(modalData.recipeIngredients[0].measurementQuantity.quantity); // quantity number
  // console.log(modalData.recipeIngredients[0].measurementUnit.unit); // unit
  // console.log(modalData.recipeIngredients[0].ingredient.ingredient); // ingredient name

  const ingredients = modalData.recipeIngredients.map((ingredient, i) => {
    if (!ingredient.measurementQuantity.quantity) {
      return (
        <li key={`${modalData.title}${i}`}>
          {ingredient.measurementUnit.unit} {ingredient.ingredient.ingredient}
        </li>
      );
    } else if (ingredient.measurementUnit.unit === "null") {
      return (
        <li key={`${modalData.title}${i}`}>
          {ingredient.measurementQuantity.quantity}{" "}
          {ingredient.ingredient.ingredient}
        </li>
      );
    } else {
      return (
        <li key={`${modalData.title}${i}`}>
          {ingredient.measurementQuantity.quantity}{" "}
          {ingredient.measurementUnit.unit} {ingredient.ingredient.ingredient}
        </li>
      );
    }
  });
  console.log(ingredients);

  // loop to find all ingredients and get them to display in the modal

  return (
    <div className="absolute flex justify-center top-[25vh] left-[25vw] bottom-[25vh] right-[25vw] z-20 border border-black bg-green-500 h-[50vh] w-[50vw]">
      <div className="flex flex-col justify-center h-full w-[90%]">
        This is the modal
        <h2>{modalData.title}</h2>
        <h3>{modalData.category}</h3>
        <h3>{modalData.area}</h3>
        <h3>{modalData.tag}</h3>
        <img src={`${modalData.image}`} className="h-32 w-36" />
        <h3>{modalData.instruction}</h3>
        <ul className="list-disc">{ingredients}</ul>
      </div>
    </div>
  );
};

export default RecipeModal;
