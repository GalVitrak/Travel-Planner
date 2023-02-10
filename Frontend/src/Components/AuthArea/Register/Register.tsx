import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<UserModel>();

  useEffect(() => {
    //check if user is already logged in
    if (authStore.getState().token) {
      notifyService.error("You're already Registered and Logged In!");
      navigate("/home");
    }
  }, []);

  async function send(user: UserModel) {
    try {
      // clears storage first ("logs out")
      authService.logout();
      await authService.register(user);
      notifyService.success("Welcome!");
      navigate("/home");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="Register Box">
      <form onSubmit={handleSubmit(send)}>
        <h2>Register</h2>

        <label>First name: </label>
        <input
          type="text"
          {...register("firstName", UserModel.fNameValidation)}
        />
        <span className="Error">{formState.errors.firstName?.message}</span>

        <label>Last name: </label>
        <input
          type="text"
          {...register("lastName", UserModel.lNameValidation)}
        />
        <span className="Error">{formState.errors.lastName?.message}</span>

        <label>Username: </label>
        <input
          type="text"
          {...register("username", UserModel.usernameValidation)}
        />
        <span className="Error">{formState.errors.username?.message}</span>

        <label>Password: </label>
        <input
          type="password"
          {...register("password", UserModel.passwordValidation)}
        />
        <span className="Error">{formState.errors.password?.message}</span>

        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
