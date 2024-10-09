import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  return showLogin ? (
    <>
      <LoginForm
        setShowRegister={setShowRegister}
        setShowLogin={setShowLogin}
      />
    </>
  ) : (
    <RegisterForm
      setShowLogin={setShowLogin}
      setShowRegister={setShowRegister}
    />
  );
};

export default AuthPage;