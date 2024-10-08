import { React, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import UserLandingPage from "./pages/UserLandingPage.jsx";
import App from "./App.jsx";
// import { createRoot } from "react-dom/client";
import ErrorPage from "./pages/ErrorPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import { Navigate } from "react-router-dom";
import Recipes from "./pages/Recipes.jsx";

const Router = () => {
  // Session Check stuff we will implement once we have Redux set up:

  // const userId = useSelector((state) => state.userId);
  // const dispatch = useDispatch();

  // const sessionCheck = async () => {
  //   const res = await axios.get("/api/session-check");

  //   if (res.data.success) {
  //     dispatch({
  //       type: "USER_AUTH",
  //       payload: res.data.userId,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   sessionCheck();
  // }, [userId]);

  const userId = true;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />} errorElement={<ErrorPage />}>
        <Route
          index
          element={
            userId ? (
              <Navigate to="/userLandingPage" />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="userLandingPage"
          element={userId ? <UserLandingPage /> : <Navigate to="/auth" />}
        />
        <Route path="auth" element={<AuthPage />} />
        <Route
          path="recipes"
          element={userId ? <Recipes /> : <Navigate to="/auth" />}
        />
      </Route>
    )
  );
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
