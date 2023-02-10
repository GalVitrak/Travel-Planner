import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { AuthActionType, authStore } from "../Redux/AuthState";
import appConfig from "../Utils/appConfig";

class AuthService {
  public async register(user: UserModel): Promise<void> {
    const response = await axios.post<string>(appConfig.registerUrl, user);
    const token = response.data;
    authStore.dispatch({
      type: AuthActionType.Register,
      payload: { token: token, rememberMe: false },
    });
  }

  public async login(
    credentials: CredentialsModel,
    rememberMe: boolean
  ): Promise<void> {
    const response = await axios.post<string>(appConfig.loginUrl, credentials);
    const token = response.data;
    const payload = {
      token: token,
      rememberMe: rememberMe,
    };
    authStore.dispatch({ type: AuthActionType.Login, payload: payload });
  }

  public logout(): void {
    authStore.dispatch({ type: AuthActionType.Logout });
  }
}

const authService = new AuthService();

export default authService;
