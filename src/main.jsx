import { React, StrictMode, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import store from "./redux/store.js";
import "./index.css";
import { Provider, useSelector, useDispatch } from "react-redux";
import axios from "axios";
import UserLandingPage from "./components/UserLandingPage.jsx";
import App from "./App.jsx";
// import { createRoot } from "react-dom/client";
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
  const loading = useSelector((state) => state.loading);
  console.log(userId);
  const dispatch = useDispatch();

  // const sessionCheck = async () => {
  //   console.log("hello");
  //   const res = await axios.get("/api/session-check");
  //   console.log(res.data);
  //   if (res.data.success) {
  //     dispatch({
  //       type: "USER_AUTH",
  //       payload: res.data.userId,
  //     });
  //   } else {
  //     dispatch({
  //       type: "LOADING",
  //     });
  //   }
  // };

  // useEffect(() => {
  //   sessionCheck();
  // }, [userId]);
  // console.log(loading);

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

            return { recipesData: res.data.recipesData };
          },
        },
        {
          path: "planner",
          element: (
            <ProtectedRoute>
              <PlannerPage />
            </ProtectedRoute>
          ),
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
