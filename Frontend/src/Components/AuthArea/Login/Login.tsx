import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import { authStore } from "../../../Redux/AuthState";
import {
  vacationStore,
  VacationActionType,
} from "../../../Redux/VacationState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";

function Login(): JSX.Element {
  const { register, handleSubmit } = useForm<CredentialsModel>();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  useEffect(() => {
    //check if user is already logged in
    if (authStore.getState().token) {
      notifyService.error("You're already Logged In!");
      navigate("/home");
    }
  }, []);

  async function send(credentials: CredentialsModel) {
    try {
      vacationStore.dispatch({
        type: VacationActionType.EmptyStore,
      });
      await authService.login(credentials, rememberMe);
      notifyService.success("Welcome Back!");
      navigate("/home");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  function handleCheckBoxChange() {
    setRememberMe(!rememberMe); // setting a boolean to store token in local or session storage.
  }

  return (
    <div className="Login Box">
      <form onSubmit={handleSubmit(send)}>
        <h2>Login</h2>

        <label>Username: </label>
        <input type="text" {...register("username")} />

        <label>Password: </label>
        <input type="password" {...register("password")} />

        <div>
          <label>Remember Me?</label>
          <input
            type="checkbox"
            className="checkBox"
            onChange={handleCheckBoxChange}
          />
        </div>

        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
