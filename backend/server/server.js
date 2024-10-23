import express from "express";
import morgan from "morgan";
import session from "express-session";
import ViteExpress from "vite-express";

const app = express();
const port = "8080";

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "hello",
    saveUninitialized: false,
    resave: false,
  })
);

// Auth Endpoints
import { authFns } from "./authCtrl.js";
const { sessionCheck, register, login, logout } = authFns;

app.get("/api/session-check", sessionCheck);
app.post("/api/login", login);
app.get("/api/logout", logout);
app.post("/api/register", register);

// Recipes Endpoints
import { recipeFns } from "./recipeCtrl.js";
const {
  recipeSearch,
  saveRecipe,
  unsaveRecipe,
  userRecipes,
  externalRecipeIds,
  createRecipe,
} = recipeFns;

// TheMealDB api request for recipe search
app.post("/api/recipe-search", recipeSearch); // needs search input in body object
// get user's saved recipes
app.get("/api/user-recipes", userRecipes);
// user saves a recipe
app.post("/api/save-recipe", saveRecipe); // needs recipe object in body object
// user un-saves a recipe
app.delete("/api/unsave-recipe/:userRecipeId", unsaveRecipe); // needs userRecipeId in req.params
// get externalRecipeId's of userRecipes to show if search recipe result is already saved or not
app.get("/api/user-recipe-external-ids", externalRecipeIds);
// create new personal recipe
app.post("/api/create-recipe", createRecipe); // needs recipe object in body object

// Planner Endpoints
import { plannerFns } from "./plannerCtrl.js";
const {
  userWeeks,
  addUserWeek,
  deleteUserWeek,
  days,
  addWeekMeal,
  editWeekMeal,
  deleteWeekMeal,
  resetWeek,
  singleWeek,
} = plannerFns;

// get user week planner data
app.get("/api/user-weeks", userWeeks); 
// get single week data
app.post("/api/single-week", singleWeek); // needs weekId in body object
// add week
app.get("/api/add-week", addUserWeek);
// delete week
app.delete("/api/delete-week/:weekId", deleteUserWeek);
// get day names
app.get("/api/days", days);
// user adds recipe to week
app.post("/api/add-week-meal/", addWeekMeal); // needs weekId, dayId, and recipeId in body object
// user moves recipe from one day to another day or to another week?
app.put("/api/edit-week-meal/", editWeekMeal); // needs weekId and dayId in body object
// user removes recipe from planner
app.delete("/api/delete-week-meal/:weekMealId", deleteWeekMeal);
// reset week
app.delete("/api/reset-week/:weekId", resetWeek);

// Grocery List Endpoints
import { gListFns } from "./gListCtrl.js";
const { groceryList } = gListFns;

// generate grocery list for specific week
app.get("/api/grocery-list/:weekId", groceryList); // needs weekId in req.params
// generate grocery list for all weeks
app.get("/api/grocery-list", groceryList);

ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
