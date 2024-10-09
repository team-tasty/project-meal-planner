import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setShowRegister, setShowLogin }) => {
  // set state values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // function to handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    // create body object
    const formData = {
      username,
      password,
    };

    // now send this data to our /login endpoint to validate:
    const res = await axios.post("/api/login", formData);

    console.log(res.data);
    // get response and save the userId to the redux store
    if (res.data.success) {
      dispatch({
        type: "USER_AUTH",
        payload: { userId: res.data.userId },
      });
      // reset username and password fields
      setUsername("");
      setPassword("");
      //navigate to the user landing page
      navigate("/userLandingPage");
    } else {
      return <p>{res.data.message}</p>;
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          value={username}
          type="text"
          required
          placeholder="user1"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          type="password"
          required
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <h3>Not a member?</h3>
      <button
        onClick={() => {
          setShowRegister(true);
          setShowLogin(false);
        }}
      >
        Join us
      </button>
    </>
  );
};

export default LoginForm;
