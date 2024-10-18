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
        payload: res.data.userId,
      });
      navigate("userLandingPage"); // might not need with the session check?
    } else {
      return <p>{res.data.message}</p>;
    }
  };

  return (
    <>
    <div className="h-[90vh] flex justify-center">
        <div className="flex flex-col w-[400px] justify-center place-items-center">
          <img src="../../public/PPLogo-no-bg.png" alt="Pantry Plan Logo" 
            className="w-[68%]"
          />
          <form 
             className="flex flex-col"
            onSubmit={handleRegister}>
            <label 
              className="font-montserratMedium mb-1"
              htmlFor="fname">First Name</label>
            <input
              value={fname}
              type="text"
              required
              placeholder="Your first name"
              className="mb-2"
              onChange={(e) => setFname(e.target.value)}
            />

            <label 
              className="font-montserratMedium mb-1"
              htmlFor="lname">Last Name</label>
            <input
              value={lname}
              type="text"
              required
              placeholder="Your last name"
              className="mb-2"
              onChange={(e) => setLname(e.target.value)}
            />
            <label 
              className="font-montserratMedium mb-1"
              htmlFor="username">Username</label>
            <input
              value={username}
              type="text"
              required
              placeholder="Create a username"
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
              placeholder="Create a password"
              className="mb-4"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="self-center mb-2">
              <button type="submit">Create Account</button>
            </span>
          </form>
          <h2 className="mb-2">Already have an account?</h2>
          <button
            onClick={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
