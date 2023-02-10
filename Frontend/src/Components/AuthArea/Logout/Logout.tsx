import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  VacationActionType,
  vacationStore,
} from "../../../Redux/VacationState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Logout.css";

function Logout(): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    vacationStore.dispatch({
      type: VacationActionType.EmptyStore,
      payload: [],
    });

    authService.logout();
    navigate("/home");
    notifyService.success("Bye Bye");
  }, []);

  return null;
}

export default Logout;
