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
import LandingPage from "./pages/LandingPage.jsx";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import ErrorPage from "./pages/ErrorPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";

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

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />} errorElement={<ErrorPage />}>
        <Route index element={<LandingPage />} />
        <Route path="authPage" element={<AuthPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </StrictMode>
);
