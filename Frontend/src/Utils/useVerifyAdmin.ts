import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../Redux/AuthState";
import notifyService from "../Services/NotifyService";

function useVerifyAdmin() {
  const navigate = useNavigate();

  useEffect(() => {
    // If we have a token:
    if (authStore.getState().token) {
      //check if user is admin:
      if (authStore.getState().user.role !== "Admin") {
        notifyService.error("You are not an Admin!");
        navigate("/home");
      }
    } else {
      notifyService.error("You are not Logged In!");
      navigate("/login");
    }
  }, []);
}

export default useVerifyAdmin;
