import { React, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import store from "./redux/store.js";
import "./index.css";
import { Provider, useSelector } from "react-redux";
import axios from "axios";
import UserLandingPage from "./components/UserLandingPage.jsx";
import App from "./App.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import AuthPage from "./components/Auth/AuthPage.jsx";
import RecipesPage from "./components/Recipes/RecipesPage.jsx";
import PlannerPage from "./components/Planner/PlannerPage.jsx";
import GroceryListPage from "./components/GrocreyList/GroceryListPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AddRecipeForm from "./components/Recipes/AddRecipeForm.jsx";

const Router = () => {
  // Session Check
  const userId = useSelector((state) => state.userId);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/app/home" />,
    },
    {
      path: "/app",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "auth",
          element: userId ? <Navigate to="/app/home" /> : <AuthPage />,
        },
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <UserLandingPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "recipes",
          element: (
            <ProtectedRoute>
              <RecipesPage />
            </ProtectedRoute>
          ),

          loader: async () => {
            const searchInfo = {
              searchInput: "de",
              searchType: "s",
            };
            const res = await axios.post("/api/recipe-search", searchInfo);
            const res2 = await axios.get("/api/user-recipe-external-ids");

            return {
              recipesData: res.data.recipesData,
              externalIds: res2.data.externalIds,
            };
          },
        },
        {
          path: "planner",
          element: (
            <ProtectedRoute>
              <PlannerPage />
            </ProtectedRoute>
          ),
          loader: async () => {
            const res = await axios.get("/api/user-recipes");
            const res2 = await axios.get("/api/user-weeks");
            const res3 = await axios.get("/api/days");

            return {
              userRecipes: res.data.userRecipes,
              userWeeks: res2.data.userWeeks,
              daysData: res3.data.days,
            };
          },
        },
        {
          path: "groceryList",
          element: (
            <ProtectedRoute>
              <GroceryListPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "addRecipe",
          element: (
            <ProtectedRoute>
              <AddRecipeForm />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </StrictMode>
);
