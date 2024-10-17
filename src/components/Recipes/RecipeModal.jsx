import { useState, useEffect, useRef } from "react";

const RecipeModal = ({ setDisplayModal, modalData }) => {
  // console.log(modalData);
  // console.log(modalData.recipeIngredients);
  // console.log(modalData.recipeIngredients[0]); // first ingredient object
  // console.log(modalData.recipeIngredients[0].measurementQuantity);
  // console.log(modalData.recipeIngredients[0].measurementQuantity.quantity); // quantity number
  // console.log(modalData.recipeIngredients[0].measurementUnit.unit); // unit
  // console.log(modalData.recipeIngredients[0].ingredient.ingredient); // ingredient names

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

  // loop to find all ingredients and get them to display in the modal

  return (
    <div className="absolute flex justify-center top-[6vh] left-[10vw] bottom-[6vh] right-[10vw] z-20 border border-black bg-green-500 h-[88vh] w-[80vw]">
      <div className="flex flex-col gap-5 h-full w-[92%]">
        <div className="flex justify-end mt-5">
          <button onClick={() => setDisplayModal(false)}>X</button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h2>{modalData.title}</h2>
          </div>
          <div className="flex items-center gap-4">
            <h3>Category: {modalData.category}</h3>
            <h3>Area: {modalData.area}</h3>
            {modalData.tag && <h3>Tags: {modalData.tag}</h3>}
          </div>
        </div>

        <img src={`${modalData.image}`} className="h-32 w-36" />
        <h3 className="">{modalData.instruction}</h3>
        <ul className="list-disc ml-5 columns-2 ">{ingredients}</ul>
      </div>
    </div>
  );
};

export default RecipeModal;
