import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../Redux/AuthState";
import authService from "../Services/AuthService";
import notifyService from "../Services/NotifyService";

function useVerifyTokenExpiry() {
  const navigate = useNavigate();

  useEffect(() => {
    //check if user is logged in
    if (authStore.getState().token) {
      // Logout if token is expired
      if (
        authStore.getState().checkIfTokenExpired(authStore.getState().token)
      ) {
        authService.logout();
        notifyService.error("Your login has expired, please login again!");
        navigate("/login");
      }
    }
  }, []);
}

export default useVerifyTokenExpiry;
