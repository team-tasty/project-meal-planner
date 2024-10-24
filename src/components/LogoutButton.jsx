import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userId);

  const handleLogout = async () => {
    const res = await axios.get("/api/logout");
    if (res.data.success) {
      dispatch({
        type: "LOGOUT",
      });
      navigate("/");
    }
  };

  return (
    <>
      <p className="headerLink cursor-pointer" onClick={handleLogout}>
        Logout
      </p>
    </>
  );
};

export default LogoutButton;
