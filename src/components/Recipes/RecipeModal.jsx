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
  // top-[6vh] left-[10vw] bottom-[6vh] right-[10vw]

  return (
    <div className="fixed flex justify-center z-20 recipeCard h-[88vh] w-[80vw] snap-center overflow-y-auto top-[6vh]">
      <div className="flex flex-col gap-5 p-3">
        <div className="flex items-center justify-between">
          <img src={`${modalData.image}`} className="h-32 w-36 rounded-[5px] m-1" />
          <div className="grow ms-1 self-end">
            <h1 className="text-2xl">{modalData.title}</h1>
            <h3 className="my-7">Category: {modalData.category}</h3>
          </div>
          <div className="grow self-end">
            <h3 className="">Area: {modalData.area}</h3>
            {!modalData.tag && <h3 className="my-7">Tags: none</h3>}
            {modalData.tag && <h3 className="my-7">Tags: {modalData.tag}</h3>}
          </div>
          <div className="flex self-start m-1">
            <button onClick={() => setDisplayModal(false)}>X</button>
          </div>
        </div>
        <h2 className="text-xl">Ingredients</h2>
        <ul className="list-disc ml-5 columns-2 ">{ingredients}</ul>
        <h2 className="text-xl">Instructions</h2>
        <h3 className="">{modalData.instruction}</h3>
      </div>
    </div>
  );
};

export default RecipeModal;
