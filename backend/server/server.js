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
const { recipeSearch } = recipeFns;

// themealdb api request for recipe search
app.post('/api/recipe-search', recipeSearch); // needs search input in body object
// get user's saved recipes
app.get('/api/user-recipes');
// user saves a recipe
app.post('/api/save-recipe'); // needs recipe object in body object
// user un-saves a recipe
app.delete('/api/unsave-recipe/:userRecipeId');
// display recipe modal
app.post('/app/recipe-detail'); // needs recipeId in body object
// get externalRecipeId's of userRecipes to show if search recipe result is already saved or not
app.get('/api/user-recipe-external-ids');

// Planner Endpoints
// TODO: import planner functions

// get user week planner data
app.get('/api/user-weeks');
// get day names
app.get('/api/days');
// user adds recipe to week
app.post('/api/add-recipe/') // needs weekId, dayId, and recipeId in body object
// user moves recipe from one day to another day or to another week?
app.put('/api/week-meal-edit/') // needs weekId and dayId in body object
// user removes recipe from planner
app.delete('/api/remove-week-meal/:weekMealId');
// add week
app.get('/api/add-week')
// delete week
app.delete('/api/delete-week/:weekId')

// Grocery List Endpoints
// TODO: import grocery list functions

// generate grocery list
app.get('/api/grocery-list-data');
// save grocery list to db (stretch goal)
// app.get('/api/save-grocery-list'); // stretch goal

ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}`);
});