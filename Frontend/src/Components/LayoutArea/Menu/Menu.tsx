import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import "./Menu.css";

function Menu(): JSX.Element {
  const [user, setUser] = useState<UserModel>();
  useEffect(() => {
    setUser(authStore.getState().user);
    unsubscribe();
  }, []);

  const unsubscribe = authStore.subscribe(() => {
    setUser(authStore.getState().user);
  });
  return (
    <div className="Menu">
      <hr />
      <NavLink style={{ color: "black" }} to="/home">
        Home
      </NavLink>
      <hr />
      <NavLink style={{ color: "black" }} to="/destinations">
        Destinations
      </NavLink>
      <hr />
      <NavLink style={{ color: "black" }} to="/vacations">
        Vacations
      </NavLink>
      <hr />
      {user ? (
        <>
          <NavLink style={{ color: "black" }} to="/followed-vacations">
            Followed Vacations
          </NavLink>
          <hr />
        </>
      ) : null}
      {user && user.role === "Admin" && (
        <>
          <NavLink style={{ color: "black" }} to="/admin">
            Admin Page
          </NavLink>
          <hr />
        </>
      )}
    </div>
  );
}

export default Menu;
