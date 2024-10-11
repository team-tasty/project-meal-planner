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

const Router = () => {
  // Session Check
  const userId = useSelector((state) => state.userId);
  const loading = useSelector((state) => state.loading);
  console.log(userId);
  const dispatch = useDispatch();

  const sessionCheck = async () => {
    console.log("hello");
    const res = await axios.get("/api/session-check");
    console.log(res.data);
    if (res.data.success) {
      dispatch({
        type: "USER_AUTH",
        payload: res.data.userId,
      });
    } else {
      dispatch({
        type: "LOADING",
      });
    }
  };

  useEffect(() => {
    sessionCheck();
  }, [userId]);
  console.log(loading);

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
          element:
            !userId && !loading ? <AuthPage /> : <Navigate to="/app/home" />,
        },
        {
          path: "home",
          element: <UserLandingPage />,
        },
        {
          path: "recipes",
          element:
            userId && !loading ? <RecipesPage /> : <Navigate to="/app/auth" />,
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
          element:
            userId && !loading ? <PlannerPage /> : <Navigate to="/app/auth" />,
        },
        {
          path: "groceryList",
          element:
            userId && !loading ? (
              <GroceryListPage />
            ) : (
              <Navigate to="/app/auth" />
            ),
        },
      ],
    },
  ]);

  // OLD MAIN JSX
  //   createRoutesFromElements(
  //     <Route path="/" element={<App />} errorElement={<ErrorPage />}>
  //       <Route index element={!userId && <Navigate to="/auth" />} />
  //       <Route
  //         path="userLandingPage"
  //         element={userId ? <UserLandingPage /> : <Navigate to="/auth" />}
  //       />
  //       <Route
  //         path="auth"
  //         element={userId ? <Navigate to="/userLandingPage" /> : <AuthPage />}
  //       />
  //       <Route
  //         path="recipes"
  //         element={userId ? <RecipesPage /> : <Navigate to="/auth" />}
  //         loader={async () => {
  //           const searchInfo = {
  //             searchInput: "de",
  //             searchType: "s",
  //           };
  //           const res = await axios.post("/api/recipe-search", searchInfo);

  //           return { recipesData: res.data.recipesData };
  //         }}
  //       />
  //       <Route
  //         path="planner"
  //         element={userId ? <PlannerPage /> : <Navigate to="/auth" />}
  //       />
  //       <Route
  //         path="groceryList"
  //         element={userId ? <GroceryListPage /> : <Navigate to="/auth" />}
  //       />
  //     </Route>
  //   )
  // );
  return <RouterProvider router={router} />;
};

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />} errorElement={<ErrorPage />}>
//       <Route index element={<LandingPage />} />
//       <Route path="auth" element={<AuthPage />} />
//       <Route path="recipes" element={<Recipes />} />
//     </Route>
//   )
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </StrictMode>
);
