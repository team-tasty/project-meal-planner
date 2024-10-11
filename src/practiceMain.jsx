import "./index.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home";
import Wishlist from "./components/Wishlist";
import MyDestinations from "./components/MyDestinations";
import Root from "./Root";
import Auth from "./components/Auth";
import DestDetails from "./components/DestDetails";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  defer,
} from "react-router-dom";
import axios from "axios";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./store/store";

const Router = () => {
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const handleCheckUser = async () => {
    const res = await axios.get("/api/user");
    console.log("handleCheckUser", res.data);
    if (res.data.userId) {
      dispatch({
        type: "LOGIN",
        payload: { username: res.data.username, userId: res.data.userId },
      });
      dispatch({ type: "UPDATE_WISHLIST", payload: res.data.wishlist });
    }
  };

  useEffect(() => {
    handleCheckUser();
  }, [userId]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/root/home" />,
    },
    {
      path: "/root",
      element: <Root />,
      children: [
        {
          path: "auth",
          element: userId ? <Navigate to="/root/home" /> : <Auth />,
        },
        {
          path: "home",
          element: <Home />,
          loader: async () => {
            const res = await axios.get("/api/destinations");
            return defer({ allDestinations: res.data });
          },
        },
        {
          path: "wishlist",
          element: userId ? <Wishlist /> : <Navigate to="/root/home" />,
        },
        {
          path: "myDestinations",
          element: userId ? <MyDestinations /> : <Navigate to="/root/home" />,
          loader: async () => {
            let res = await axios.get("/api/user-destinations");
            return res.data;
          },
        },
        {
          path: "destination/:destId",
          element: <DestDetails />,
          loader: async ({ params }) => {
            const res = await axios.get(`/api/destination/${params.destId}`);
            return { dest: res.data };
          },
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);
