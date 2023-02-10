import axios from "axios";
import { authStore } from "../Redux/AuthState";

class InterceptorsService {
  public createInterceptors(): void {
    axios.interceptors.request.use((request) => {
      // If we have a token:
      if (authStore.getState().token) {
        // Create JWT header with that token:
        request.headers.set({
          authorization: "Bearer " + authStore.getState().token,
        });
      }

      return request;
    });
  }
}

const interceptorsService = new InterceptorsService();

export default interceptorsService;
