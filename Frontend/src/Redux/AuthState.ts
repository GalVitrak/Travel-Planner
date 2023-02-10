import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import UserModel from "../Models/UserModel";
import notifyService from "../Services/NotifyService";

// 1. Auth State
export class AuthState {
  public token: string = null;
  public user: UserModel = null;

  //a function to check if the token is expired
  public checkIfTokenExpired = (token: string) => {
    try {
      const decoded = JSON.parse(window.atob(token.split(".")[1]));
      const expiry = decoded.exp;

      if (Date.now() < expiry * 1000) {
        return false;
      }

      return true;
    } catch (e) {
      notifyService.error(e);
      return null;
    }
  };

  public constructor() {
    // Take token from session storage, restore if exists:
    this.token = sessionStorage.getItem("token");
    if (!this.token) {
      this.token = localStorage.getItem("token");
    }

    if (this.token) {
      if (!this.checkIfTokenExpired(this.token)) {
        const container: { user: UserModel } = jwtDecode(this.token);
        this.user = container.user;
      } else {
        this.token = null;
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
      }
    }
  }
}

// 2. Auth Action Type
export enum AuthActionType {
  Register,
  Login,
  Logout,
}

// 3. Auth Action
export interface AuthAction {
  type: AuthActionType;
  payload?: any;
}

// 4. Auth Reducer
export function authReducer(
  currentState = new AuthState(),
  action: AuthAction
): AuthState {
  // Duplicate current state:
  const newState = { ...currentState };

  // Perform the needed operation:
  let container: { user: UserModel };
  switch (action.type) {
    case AuthActionType.Register:
    case AuthActionType.Login:
      newState.token = action.payload.token;
      container = jwtDecode(newState.token);
      newState.user = container.user;

      if (action.payload.rememberMe) {
        localStorage.setItem("token", newState.token);
        break;
      }
      sessionStorage.setItem("token", newState.token);
      break;

    case AuthActionType.Logout:
      newState.token = null;
      newState.user = null;
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
      break;
  }

  // Return the new state:
  return newState;
}

// 5. Auth Store
export const authStore = createStore(authReducer);
