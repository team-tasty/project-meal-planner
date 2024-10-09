import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ setShowRegister, setShowLogin }) => {
  // set state values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // function to handle register
  const handleRegister = async (e) => {
    e.preventDefault();

    // create body object
    const formData = {
      fname,
      lname,
      username,
      password,
    };

    // make the axios call to the backend
    const res = await axios.post("/api/register", formData);
    // if successful - dispatch the userId to the redux store, if not - display a p tag with the message
    if (res.data.success) {
      dispatch({
        type: "USER_AUTH",
        payload: { userId: res.data.userId },
      });
      navigate("userLandingPage"); // might not need with the session check?
    } else {
      return <p>{res.data.message}</p>;
    }
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <label htmlFor="fname">First Name</label>
        <input
          value={fname}
          type="text"
          required
          placeholder="Your first name"
          onChange={(e) => setFname(e.target.value)}
        />

        <label htmlFor="lname">Last Name</label>
        <input
          value={lname}
          type="text"
          required
          placeholder="Your last name"
          onChange={(e) => setLname(e.target.value)}
        />
        <label htmlFor="username">Username</label>
        <input
          value={username}
          type="text"
          required
          placeholder="Create a username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          type="password"
          required
          placeholder="Create a password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Create Account</button>
      </form>
      <h3>Already have an account?</h3>
      <button
        onClick={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      >
        Login
      </button>
    </>
  );
};

export default RegisterForm;
