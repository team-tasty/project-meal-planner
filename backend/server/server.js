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
app.get('/api/recipe-search/:search');
// get user's saved recipes
app.get('/api/user-recipes');
// user saves a recipe
app.get('/api/save-recipe');
// user un-saves a recipe
app.get('/api/unsave-recipe');
// display recipe modal
app/get('/app/recipe-detail/:recipeId');

// Planner Endpoints
// TODO: import planner functions

// get user week planner data
app.get('/api/user-weeks');
// user adds recipe to week
// user removes recipe from week?

// Grocery List Endpoints
// TODO: import grocery list functions

// generate grocery list (should this be on the front end)
// save grocery list to db

ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}`);
});