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
// TODO: import auth functions

app.get('/api/session-check');
app.post('/api/login');
app.get('/api/logout');
app.post('/api/register');

// Recipes Endpoints
// TODO: import recipes functions

// themealdb api request for recipe search
app.get('/api/recipe-search/:userSearchStr');  // what is a better name for the user input string???
// get user's saved recipes
app.get('/api/user-recipes');
// user saves a recipe
app.get('/api/save-recipe');
// user un-saves a recipe
app.delete('/api/unsave-recipe');
// display recipe modal
app/get('/app/recipe-detail/:recipeId');
// rating for recipe
app.get('/api/rate-recipe');
// add week
app.get('/api/add-week')
// delete week
app.delete('/api/delete-week/:weekId')

// Planner Endpoints
// TODO: import planner functions

// get user week planner data
app.get('/api/user-weeks');
// user adds recipe to week
app.post('/api/add-recipe/') // needs weekId and dayId and recipeId
// user moves recipe from one day to another day or to another week?
app.put('/api/week-meal-edit/') // needs weekId and dayId
// user removes recipe from planner
app.delete('/api/remove-week-meal/:weekMealId');

// Grocery List Endpoints
// TODO: import grocery list functions

// generate grocery list
app.get('/api/grocery-list-data');
// save grocery list to db (stretch goal)
// app.get('/api/save-grocery-list'); // stretch goal

ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}`);
});