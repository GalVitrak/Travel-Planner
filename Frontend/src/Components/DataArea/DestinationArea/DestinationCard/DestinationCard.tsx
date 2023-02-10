import { NavLink } from "react-router-dom";
import DestinationModel from "../../../../Models/DestinationModel";
import { authStore } from "../../../../Redux/AuthState";
import destinationService from "../../../../Services/DestinationService";
import notifyService from "../../../../Services/NotifyService";
import appConfig from "../../../../Utils/appConfig";
import "./DestinationCard.css";

interface DestinationCardProps {
  destination: DestinationModel;
}

function DestinationCard(props: DestinationCardProps): JSX.Element {
  async function deleteDestination() {
    try {
      if (!window.confirm("Are you sure?")) return;
      await destinationService.deleteDestination(
        props.destination.destinationId
      );
      notifyService.success("Destination has been Deleted!");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="DestinationCard Box">
      <div>
        <img src={appConfig.imagesUrl + props.destination.imageName} />
      </div>
      {authStore.getState().token &&
        authStore.getState().user.role === "Admin" && (
          <div className="buttons" style={{ margin: "10px" }}>
            <NavLink
              to={"/destinations/update/" + props.destination.destinationId}
            >
              <button>✏️</button>
            </NavLink>
            <button onClick={deleteDestination}>❌</button>
          </div>
        )}
      <div className="aboutDestination">
        <h2>{props.destination.destinationName}</h2>

        <h4>About this destination:</h4>
        <p>{props.destination.description}</p>
      </div>
      {authStore.getState().token && (
        <>
          <NavLink
            to={"/vacations/destination/" + props.destination.destinationId}
          >
            <p>Show Vacations for this destination</p>
          </NavLink>
        </>
      )}
    </div>
  );
}

export default DestinationCard;
