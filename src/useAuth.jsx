import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function useAuth() {
  const [loading, setLoading] = useState(true);
  const [authUserId, setAuthUserId] = useState(null);

  const dispatch = useDispatch();

  const sessionCheck = async () => {
    const res = await axios.get("/api/session-check");

    if (res.data.userId) {
      setLoading(false);
      setAuthUserId(res.data.userId);
      dispatch({
        type: "USER_AUTH",
        payload: res.data.userId,
      });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    sessionCheck();
  }, []);

  return { authUserId, loading };
}

export default useAuth;
