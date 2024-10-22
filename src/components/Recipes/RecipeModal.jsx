import { useState, useEffect, useRef } from "react";

const RecipeModal = ({ setDisplayModal, modalData }) => {

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
    <div className="fixed flex justify-center z-20 recipeCard h-[88vh] w-[80vw] snap-center overflow-y-auto top-[6vh] left-[10vw] bottom-[6vh] right-[10vw]">
      <div className="flex flex-col gap-5 p-3">
        <div className="flex sm:hidden self-end m-1 text-sm">
            <button onClick={() => setDisplayModal(false)}>X</button>
        </div>
        <div className="flex items-center justify-between">
          <img src={`${modalData.image}`} className="h-32 w-36 rounded-[5px] m-1 self-start lg:self-center" />
          <div className="grow ms-1 self-center lg:self-end">
            <h1 className="text-lg lg:text-2xl hyphens-auto">{modalData.title}</h1>
            <h3 className="mt-3 sm:mt-7 lg:my-7 text-sm lg:text-base">Category: {modalData.category}</h3>
          </div>
          <div className="grow self-end hidden lg:block">
            <h3 className="">Area: {modalData.area}</h3>
            {!modalData.tag && <h3 className="my-7">Tags: none</h3>}
            {modalData.tag && <h3 className="my-7">Tags: {modalData.tag.replace(/,/g, ", ")}</h3>}
          </div>
          <div className="hidden sm:flex sm:self-start m-1 text-sm lg:text-base">
            <button onClick={() => setDisplayModal(false)}>X</button>
          </div>
        </div>
        <h2 className="text-lg lg:text-xl">Ingredients</h2>
        <ul className="list-disc ml-5 columns-2 text-sm lg:text-base">{ingredients}</ul>
        <h2 className="text-lg lg:text-xl">Instructions</h2>
        <h3 className="text-sm lg:text-base">{modalData.instruction}</h3>
      </div>
    </div>
  );
};

export default RecipeModal;
