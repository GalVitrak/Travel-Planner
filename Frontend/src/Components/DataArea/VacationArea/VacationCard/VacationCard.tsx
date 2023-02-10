import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DestinationModel from "../../../../Models/DestinationModel";
import VacationModel from "../../../../Models/VacationModel";
import { authStore } from "../../../../Redux/AuthState";
import destinationService from "../../../../Services/DestinationService";
import notifyService from "../../../../Services/NotifyService";
import vacationService from "../../../../Services/VacationService";
import appConfig from "../../../../Utils/appConfig";
import Spinner from "../../../HomeArea/Spinner/Spinner";
import "./VacationCard.css";

interface VacationCardProps {
  vacation: VacationModel;
  trigger?: any; // a trigger for a function to reload vacations in Followed Vacations page.
}

function VacationCard(props: VacationCardProps): JSX.Element {
  const [destination, setDestinations] = useState<DestinationModel>();
  const [vacation, setVacation] = useState<VacationModel>();

  useEffect(() => {
    destinationService
      .getOneDestination(props.vacation.destinationId)
      .then((destination) => setDestinations(destination))
      .catch((err) => notifyService.error(err));

    setVacation(props.vacation);
  }, []);

  async function deleteVacation() {
    try {
      if (!window.confirm("Are you sure?")) return;
      await vacationService.deleteVacation(vacation.vacationId);
      notifyService.success("Destination has been Deleted!");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  async function setFollowing() {
    if (!authStore.getState().token) {
      notifyService.error("You must be logged in to follow vacations");
      return;
    }
    if (vacation.isFollowing === 1) {
      vacation.isFollowing = 0;
      vacation.followersCount--;
      await vacationService.updateVacationFollower(
        vacation.vacationId,
        vacation.isFollowing,
        vacation.followersCount
      );
    } else {
      vacation.isFollowing = 1;
      vacation.followersCount++;
      await vacationService.updateVacationFollower(
        vacation.vacationId,
        vacation.isFollowing,
        vacation.followersCount
      );
    }
    props.trigger(); // after pressing the like button the trigger triggers a function in it's parent component.
  }

  return (
    <div className="VacationCard Box">
      {!destination ? (
        <Spinner />
      ) : (
        <>
          <div>
            <div>
              <img src={appConfig.imagesUrl + destination.imageName} />
            </div>
            <div>
              <h2>{destination.destinationName}</h2>
              <div className="buttons">
                {props.vacation.isFollowing === 1 ? (
                  <button
                    style={{ backgroundColor: "rgb(50, 150, 250)" }}
                    onClick={setFollowing}
                  >
                    💕{props.vacation.followersCount}
                  </button>
                ) : (
                  <button
                    style={{ backgroundColor: "rgb(50, 100, 150)" }}
                    onClick={setFollowing}
                  >
                    💕{props.vacation.followersCount}
                  </button>
                )}
                {authStore.getState().token &&
                  authStore.getState().user.role === "Admin" && (
                    <>
                      <NavLink
                        to={"/vacations/update/" + props.vacation.vacationId}
                      >
                        <button>✏️</button>
                      </NavLink>
                      <button onClick={deleteVacation}>❌</button>
                    </>
                  )}
              </div>
              <div className="descriptionDiv">
                <h4>About this destination:</h4>
                <p>{destination.description}</p>
              {authStore.getState().token && (
                <>
                  <NavLink
                    to={
                      "/vacations/destination/" + props.vacation.destinationId
                    }
                    >
                    <p>Show Vacations for this destination</p>
                  </NavLink>
                </>
              )}
              </div>
            </div>
            From: {props.vacation.startDate}
            <br />
            To: {props.vacation.endDate}
            <br />
            Price: ${props.vacation.price}
          </div>
        </>
      )}
    </div>
  );
}

export default VacationCard;
