import groceryList from "../../../functions/groceryList.js";
import groceryListPracticeData from "../../../functions/groceryListPracticeData.js";
import userWeeksExampleRes2 from "../../../functions/userWeeksExampleRes2.js";
import { useSelector } from "react-redux";

const GroceryListItem = () => {
  const groceryList = useSelector((state) => state.groceryList);
  console.log(groceryList);

  const testData = groceryList;

  const cannedList = testData
    .filter((arrIng) => arrIng.category === "canned")
    .map((arrIng, index) => {
      return (
        <li 
          key={`canned${index}`}
          className="flex flex-row">
          <input type="checkbox" className="ms-2 me-3 mt-[3.5px] h-4" />
          <span className="flex-start align-items-center">
            {arrIng.quantity > 0 ? `${arrIng.quantity} ` : ""}
            {arrIng.unit !== "null" ? arrIng.unit : ""} {arrIng.ingredient}
          </span>
        </li>
      );
    });

  const frozenList = testData
    .filter((arrIng) => arrIng.category === "frozen")
    .map((arrIng, index) => {
      return (
        <li 
          key={`frozen${index}`}
          className="flex flex-row">
          <input type="checkbox" className="ms-2 me-3 mt-[3.5px] h-4" />
          <span className="flex-start align-items-center">
            {arrIng.quantity > 0 ? `${arrIng.quantity} ` : ""}
            {arrIng.unit !== "null" ? arrIng.unit : ""} {arrIng.ingredient}
          </span>
        </li>
      );
    });

  const processedList = testData
    .filter((arrIng) => arrIng.category === "processed")
    .map((arrIng, index) => {
      return (
        <li 
          key={`processed${index}`}
          className="flex flex-row">
          <input type="checkbox" className="ms-2 me-3 mt-[3.5px] h-4" />
          <span className="flex-start align-items-center">
            {arrIng.quantity > 0 ? `${arrIng.quantity} ` : ""}
            {arrIng.unit !== "null" ? arrIng.unit : ""} {arrIng.ingredient}
          </span>
        </li>
      );
    });

  const bakingList = testData
    .filter((arrIng) => arrIng.category === "baking")
    .map((arrIng, index) => {
      return (
        <li 
          key={`baking${index}`}
          className="flex flex-row">
          <input type="checkbox" className="ms-2 me-3 mt-[3.5px] h-4" />
          <span className="flex-start align-items-center">
            {arrIng.quantity > 0 ? `${arrIng.quantity} ` : ""}
            {arrIng.unit !== "null" ? arrIng.unit : ""} {arrIng.ingredient}
          </span>
        </li>
      );
    });

  const produceList = testData
    .filter((arrIng) => arrIng.category === "produce")
    .map((arrIng, index) => {
      return (
        <li 
          key={`produce${index}`}
          className="flex flex-row">
          <input type="checkbox" className="ms-2 me-3 mt-[3.5px] h-4" />
          <span className="flex-start align-items-center">
            {arrIng.quantity > 0 ? `${arrIng.quantity} ` : ""}
            {arrIng.unit !== "null" ? arrIng.unit : ""} {arrIng.ingredient}
          </span>
        </li>
      );
    });

  const dairyList = testData
    .filter((arrIng) => arrIng.category === "dairy")
    .map((arrIng, index) => {
      return (
        <li 
          key={`dairy${index}`}
          className="flex flex-row">
          <input type="checkbox" className="ms-2 me-3 mt-[3.5px] h-4" />
          <span className="flex-start align-items-center">
            {arrIng.quantity > 0 ? `${arrIng.quantity} ` : ""}
            {arrIng.unit !== "null" ? arrIng.unit : ""} {arrIng.ingredient}
          </span>
        </li>
      );
    });

  const proteinList = testData
    .filter((arrIng) => arrIng.category === "protein")
    .map((arrIng, index) => {
      return (
        <li 
          key={`protein${index}`}
          className="flex flex-row">
          <input type="checkbox" className="ms-2 me-3 mt-[3.5px] h-4" />
          <span className="flex-start align-items-center">
            {arrIng.quantity > 0 ? `${arrIng.quantity} ` : ""}
            {arrIng.unit !== "null" ? arrIng.unit : ""} {arrIng.ingredient}
          </span>
        </li>
      );
    });

  const otherList = testData
    .filter((arrIng) => arrIng.category === "other")
    .map((arrIng, index) => {
      return (
        <li 
          key={`other${index}`}
          className="flex flex-row">
          <input type="checkbox" className="ms-2 me-3 mt-[3.5px] h-4" />
          <span className="flex-start align-items-center">
            {arrIng.quantity > 0 ? `${arrIng.quantity} ` : ""}
            {arrIng.unit !== "null" ? arrIng.unit : ""} {arrIng.ingredient}
          </span>
        </li>
      );
    });

  // useEffect(() => {

  // }, [groceryList])

  return (
    <>
      <div className="flex flex-col place-items-center my-4">
        <div className="max-w-[440px]">
          <h1 className="text-2xl text-center pb-2 mb-2 border-b-[1px] border-lineGreen">Grocery List</h1>
          {cannedList.length > 0 && (
            <>
              <h2 className="text-lg">Canned</h2>
              <ul>{cannedList}</ul>
            </>
          )}
          {frozenList.length > 0 && (
            <>
              <h2 className="text-lg">Frozen</h2>
              <ul>{frozenList}</ul>
            </>
          )}
          {processedList.length > 0 && (
            <>
              <h2 className="text-lg">Processed</h2>
              <ul>{processedList}</ul>
            </>
          )}
          {bakingList.length > 0 && (
            <>
              <h2 className="text-lg">Baking</h2>
              <ul>{bakingList}</ul>
            </>
          )}
          {produceList.length > 0 && (
            <>
              <h2 className="text-lg">Produce</h2>
              <ul>{produceList}</ul>
            </>
          )}
          {dairyList.length > 0 && (
            <>
              <h2 className="text-lg">Dairy</h2>
              <ul>{dairyList}</ul>
            </>
          )}
          {proteinList.length > 0 && (
            <>
              <h2 className="text-lg">Protein</h2>
              <ul>{proteinList}</ul>
            </>
          )}
          {otherList.length > 0 && (
            <>
              <h2 className="text-lg">Other</h2>
              <ul>{otherList}</ul>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GroceryListItem;
