import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useSelector } from "react-redux";

import "./App.css";

function App() {
  const userId = useSelector((state) => state.userId)

  return (
    <>
      {userId &&
        <Header />
      }
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
