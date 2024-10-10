import { useState } from "react";

const RecipeModal = ({ setDisplayModal, modalData }) => {
  console.log(modalData);
  console.log(modalData[0]);
  return (
    <div className="absolute flex justify-center top-[25vh] left-[25vw] bottom-[25vh] right-[25vw] z-20 border border-black bg-green-500 h-[50vh] w-[50vw]">
      <div className="flex flex-col justify-center h-full w-[90%]">
        This is the modal
        <h2>{modalData[0].title}</h2>
        <h3>{modalData[0].category}</h3>
        <h3>{modalData[0].area}</h3>
        <h3>{modalData[0].tags}</h3>
        <img src={`${modalData[0].image}`} className="h-32 w-36" />
        <h3>{modalData[0].instruction}</h3>
      </div>
    </div>
  );
};

export default RecipeModal;
