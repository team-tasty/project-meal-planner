import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import ViteExpress from 'vite-express';

const app = express();
const port = '8080';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: 'hello',
    saveUninitialized: false,
    resave: false
  })
);

// Auth Endpoints
import { authFns } from './authCtrl.js';
const { sessionCheck, register, login, logout } = authFns;

app.get('/api/session-check', sessionCheck);
app.post('/api/login', login);
app.get('/api/logout', logout);
app.post('/api/register', register);

// Recipes Endpoints
import { recipeFns } from './recipeCtrl.js';
const { recipeSearch, saveRecipe, unsaveRecipe, userRecipes, externalRecipeIds } = recipeFns;

// themealdb api request for recipe search
app.post('/api/recipe-search', recipeSearch); // needs search input in body object
// get user's saved recipes
app.get('/api/user-recipes', userRecipes);
// user saves a recipe
app.post('/api/save-recipe', saveRecipe); // needs recipe object in body object
// user un-saves a recipe
app.delete('/api/unsave-recipe/:userRecipeId', unsaveRecipe);
// display recipe modal (not needed because data is aleady at front end)
// app.post('/app/recipe-detail'); // needs recipeId in body object
// get externalRecipeId's of userRecipes to show if search recipe result is already saved or not
app.get('/api/user-recipe-external-ids', externalRecipeIds);

// Planner Endpoints
import { plannerFns } from './plannerCtrl.js';
const { userWeeks, addUserWeek, deleteUserWeek, days, createWeekMeal, editWeekMeal, deleteWeekMeal } = plannerFns;

// get user week planner data
app.get('/api/user-weeks', userWeeks);
// get day names
app.get('/api/days', days);
// user adds recipe to week
app.post('/api/create-week-meal/', createWeekMeal) // needs weekId, dayId, and recipeId in body object
// user moves recipe from one day to another day or to another week?
app.put('/api/edit-week-meal/', editWeekMeal) // needs weekId and dayId in body object
// user removes recipe from planner
app.delete('/api/remove-week-meal/:weekMealId', deleteWeekMeal);
// add week
app.get('/api/add-week', addUserWeek)
// delete week
app.delete('/api/delete-week/:weekId', deleteUserWeek)

// Grocery List Endpoints
// TODO: import grocery list functions

// generate grocery list
app.get('/api/grocery-list-data');
// save grocery list to db (stretch goal)
// app.get('/api/save-grocery-list'); // stretch goal

ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}`);
});