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
        payload: res.data.userId,
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
      <div className="h-[90vh] flex justify-center my-4">
        <div className="flex flex-col w-[400px] justify-center place-items-center">
          <img src="../../public/PPLogo-no-bg.png" alt="Pantry Plan Logo" 
            className="w-[68%]"
          />
          <form 
            className="flex flex-col"
            onSubmit={handleLogin}>
            <label 
              className="font-montserratMedium mb-1"
              htmlFor="username">Username</label>
            <input
              value={username}
              type="text"
              required
              placeholder="user1"
              className="mb-2"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label 
              className="font-montserratMedium mb-1"
              htmlFor="password">Password</label>
            <input
              value={password}
              type="password"
              required
              placeholder="********"
              className="mb-4"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="self-center mb-2">
              <button type="submit">Login</button>
            </span>
          </form>
          <h2 className="mb-2">Not a member?</h2>
          <button
            onClick={() => {
              setShowRegister(true);
              setShowLogin(false);
            }}
          >
            Join us
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
