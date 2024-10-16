import groceryList from "../../../functions/groceryList.js";
import groceryListPracticeData from "../../../functions/groceryListPracticeData.js";
import userWeeksExampleRes2 from "../../../functions/userWeeksExampleRes2.js";

const GroceryListItem = () => {

  const testData = groceryList(userWeeksExampleRes2)

  const cannedList = testData.map((arrIng, index) => {
    if (arrIng.category === "canned") {
        if (arrIng.unit === "null") {
          return (
            <li key={`canned${index}`}>
              <input type="checkbox" className="ms-2 me-3" />
              {arrIng.quantity} {arrIng.ingredient}
            </li>
          )
        } else {
          return (
            <li key={`canned${index}`}>
              <input type="checkbox" className="ms-2 me-3" />
              {arrIng.quantity} {arrIng.unit} {arrIng.ingredient}
            </li>
          )
        }
    }
    return
  }).filter(Boolean)

  const frozenList = testData.map((arrIng, index) => {
    if (arrIng.category === "frozen") {
        if (arrIng.unit === "null") {
          return (
            <li key={`frozen${index}`}>
              <input type="checkbox" className="ms-2 me-3" />
              {arrIng.quantity} {arrIng.ingredient}
            </li>
          )
        } else {
          return (
            <li key={`frozen${index}`}>
              <input type="checkbox" className="ms-2 me-3" />
              {arrIng.quantity} {arrIng.unit} {arrIng.ingredient}
            </li>
          )
        }
    }
  }).filter(Boolean)

  const processedList = testData.map((arrIng, index) => {
    if (arrIng.category === "processed") {
        if (arrIng.unit === "null") {
          return (
            <li key={`processed${index}`}>
              <input type="checkbox" className="ms-2 me-3" />
              {arrIng.quantity} {arrIng.ingredient}
            </li>
          )
        } else {
          return (
            <li key={`processed${index}`}>
              <input type="checkbox" className="ms-2 me-3" />
              {arrIng.quantity} {arrIng.unit} {arrIng.ingredient}
            </li>
          )
        }
    }
  }).filter(Boolean)

  const bakingList = testData.map((arrIng, index) => {
    if (arrIng.category === "baking") {
        if (arrIng.unit === "null") {
          return (
            <li key={`baking${index}`}>
                <input type="checkbox" className="ms-2 me-3" />
              {arrIng.quantity} {arrIng.ingredient}
            </li>
          )
        } else {
          return (
            <li key={`baking${index}`}>
              <input type="checkbox" className="ms-2 me-3" />
              {arrIng.quantity} {arrIng.unit} {arrIng.ingredient}
            </li>
          )
        }
    }
  }).filter(Boolean)

  const produceList = testData.map((arrIng, index) => {
    if (arrIng.category === "produce") {
        if (arrIng.unit === "null") {
          return (
            <li key={`produce${index}`}>
              <input type="checkbox" className="ms-2 me-3" />
              {arrIng.quantity} {arrIng.ingredient}
            </li>
          )
        } else {
          return (
            <li key={`produce${index}`}>
              <input type="checkbox" className="ms-2 me-3" />
              {arrIng.quantity} {arrIng.unit} {arrIng.ingredient}
            </li>
          )
        }
    }
  }).filter(Boolean)

  const dairyList = testData.map((arrIng, index) => {
    if (arrIng.category === "dairy") {
        if (arrIng.unit === "null") {
          return (
            <li key={`dairy${index}`}>
              <input type="checkbox" className="ms-2 me-3" />
              {arrIng.quantity} {arrIng.ingredient}
            </li>
          )
        } else {
          return (
            <li key={`dairy${index}`}>
              <input type="checkbox" className="ms-2 me-3" />
              {arrIng.quantity} {arrIng.unit} {arrIng.ingredient}
            </li>
          )
        }
    }
  }).filter(Boolean)

  const proteinList = testData.map((arrIng, index) => {
    if (arrIng.category === "protein") {
        if (arrIng.unit === "null") {
          return (
            <li key={`protein${index}`}>
              <input type="checkbox" className="ms-2 me-3" />
              {arrIng.quantity} {arrIng.ingredient}
            </li>
          )
        } else {
          return (
            <li key={`protein${index}`}>
              <input type="checkbox" className="ms-2 me-3" />
              {arrIng.quantity} {arrIng.unit} {arrIng.ingredient}
            </li>
          )
        }
    }
  }).filter(Boolean)

  const otherList = testData.map((arrIng, index) => {
    if (arrIng.category === "other") {
        if (arrIng.unit === "null") {
          return (
            <li key={`other${index}`}>
              <input type="checkbox" className="ms-2 me-3" />
              {arrIng.quantity} {arrIng.ingredient}
            </li>
          )
        } else {
          return (
            <li key={`other${index}`}>
              <input type="checkbox" className="ms-2 me-3" />
              {arrIng.quantity} {arrIng.unit} {arrIng.ingredient}
            </li>
          )
        }
    }
  }).filter(Boolean)

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
