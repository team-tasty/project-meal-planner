import groceryList from "../../../functions/groceryList.js";
import groceryListPracticeData from "../../../functions/groceryListPracticeData.js";
import userWeeksExampleRes2 from "../../../functions/userWeeksExampleRes2.js";

const GroceryListItem = () => {

  const testData = groceryList(userWeeksExampleRes2)

  const cannedList = testData.filter((arrIng) => arrIng.category === "canned")
  .map((arrIng, index) => {
    return (
      <li key={`canned${index}`}>
        <input type="checkbox" className="ms-2 me-3" />
        {arrIng.quantity > 0 ? `${arrIng.quantity} ` : ""}{arrIng.unit !== "null" ? arrIng.unit : ""} {arrIng.ingredient}
      </li>
    )
  })

  const frozenList = testData.filter((arrIng) => arrIng.category === "frozen")
  .map((arrIng, index) => {
    return (
      <li key={`frozen${index}`}>
        <input type="checkbox" className="ms-2 me-3" />
        {arrIng.quantity > 0 ? `${arrIng.quantity} ` : ""}{arrIng.unit !== "null" ? arrIng.unit : ""} {arrIng.ingredient}
      </li>
    )
  })

  const processedList = testData.filter((arrIng) => arrIng.category === "processed")
  .map((arrIng, index) => {
    return (
      <li key={`processed${index}`}>
        <input type="checkbox" className="ms-2 me-3" />
        {arrIng.quantity > 0 ? `${arrIng.quantity} ` : ""}{arrIng.unit !== "null" ? arrIng.unit : ""} {arrIng.ingredient}
      </li>
    )
  })

  const bakingList = testData.filter((arrIng) => arrIng.category === "baking")
  .map((arrIng, index) => {
    return (
      <li key={`baking${index}`}>
        <input type="checkbox" className="ms-2 me-3" />
        {arrIng.quantity > 0 ? `${arrIng.quantity} ` : ""}{arrIng.unit !== "null" ? arrIng.unit : ""} {arrIng.ingredient}
      </li>
    )
  })

  const produceList = testData.filter((arrIng) => arrIng.category === "produce")
  .map((arrIng, index) => {
    return (
      <li key={`produce${index}`}>
        <input type="checkbox" className="ms-2 me-3" />
        {arrIng.quantity > 0 ? `${arrIng.quantity} ` : ""}{arrIng.unit !== "null" ? arrIng.unit : ""} {arrIng.ingredient}
      </li>
    )
  })

  const dairyList = testData.filter((arrIng) => arrIng.category === "dairy")
  .map((arrIng, index) => {
    return (
      <li key={`dairy${index}`}>
        <input type="checkbox" className="ms-2 me-3" />
        {arrIng.quantity > 0 ? `${arrIng.quantity} ` : ""}{arrIng.unit !== "null" ? arrIng.unit : ""} {arrIng.ingredient}
      </li>
    )
  })

  const proteinList = testData.filter((arrIng) => arrIng.category === "protein")
  .map((arrIng, index) => {
    return (
      <li key={`protein${index}`}>
        <input type="checkbox" className="ms-2 me-3" />
        {arrIng.quantity > 0 ? `${arrIng.quantity} ` : ""}{arrIng.unit !== "null" ? arrIng.unit : ""} {arrIng.ingredient}
      </li>
    )
  })

  const otherList = testData.filter((arrIng) => arrIng.category === "other")
  .map((arrIng, index) => {
    return (
      <li key={`other${index}`}>
        <input type="checkbox" className="ms-2 me-3" />
        {arrIng.quantity > 0 ? `${arrIng.quantity} ` : ""}{arrIng.unit !== "null" ? arrIng.unit : ""} {arrIng.ingredient}
      </li>
    )
  })

  return (
  <>
    <h1 className="underline">Grocery List</h1>
    { cannedList.length > 0 &&
      <>
      <h2 className="underline">Canned</h2>
        <ul>
          {cannedList}
        </ul>
      </>
    }
    { frozenList.length > 0 &&
      <>
      <h2 className="underline">Frozen</h2>
        <ul>
          {frozenList}
        </ul>
      </>
    }
    { processedList.length > 0 &&
      <>
      <h2 className="underline">Processed</h2>
        <ul>
          {processedList}
        </ul>
      </>
    }
    { bakingList.length > 0 &&
      <>
      <h2 className="underline">Baking</h2>
        <ul>
          {bakingList}
        </ul>
      </>
    }
    { produceList.length > 0 &&
      <>
      <h2 className="underline">Produce</h2>
        <ul>
          {produceList}
        </ul>
      </>
    }
    { dairyList.length > 0 &&
      <>
      <h2 className="underline">Dairy</h2>
        <ul>
          {dairyList}
        </ul>
      </>
    }
    { proteinList.length > 0 &&
      <>
      <h2 className="underline">Protein</h2>
        <ul>
          {proteinList}
        </ul>
      </>
    }
    { otherList.length > 0 &&
      <>
      <h2 className="underline">Other</h2>
        <ul>
          {otherList}
        </ul>
      </>
    }
  </>
  )
};

export default GroceryListItem;
