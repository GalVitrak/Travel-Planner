import { Navigate, Route, Routes } from "react-router-dom";
import AdminPage from "../../AuthArea/AdminPage/AdminPage";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import AddDestination from "../../DataArea/DestinationArea/AddDestination/AddDestination";
import DestinationList from "../../DataArea/DestinationArea/DestinationList/DestinationList";
import ShowDestination from "../../DataArea/DestinationArea/ShowDestination/ShowDestination";
import UpdateDestination from "../../DataArea/DestinationArea/UpdateDestination/UpdateDestination";
import AddVacation from "../../DataArea/VacationArea/AddVacation/AddVacation";
import FollowedVacations from "../../DataArea/VacationArea/FollowedVacations/FollowedVacations";
import UpdateVacation from "../../DataArea/VacationArea/UpdateVacation/UpdateVacation";
import VacationList from "../../DataArea/VacationArea/VacationList/VacationList";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(this: any): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/destinations" element={<DestinationList />} />
        <Route path="/destinations/add" element={<AddDestination />} />
        <Route path="/vacations" element={<VacationList />} />
        <Route path="/followed-vacations" element={<FollowedVacations />} />
        <Route path="/vacations/add" element={<AddVacation />} />
        <Route
          path="/vacations/update/:vacationId"
          element={<UpdateVacation />}
        />
        <Route
          path="/vacations/destination/:destinationId"
          element={<ShowDestination />}
        />
        <Route
          path="/destinations/update/:destinationId"
          element={<UpdateDestination />}
        />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default Routing;
