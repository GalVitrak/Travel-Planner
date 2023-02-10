import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../../Models/VacationModel";
import { authStore } from "../../../../Redux/AuthState";
import notifyService from "../../../../Services/NotifyService";
import vacationService from "../../../../Services/VacationService";
import "./SmallVacationCard.css";

interface SmallVacationCardProps {
  vacation: VacationModel;
}

// a smaller Vacation Prop Card for vacation's list in destination page
function SmallVacationCard(props: SmallVacationCardProps): JSX.Element {
  const [vacation, setVacation] = useState<VacationModel>();

  useEffect(() => {
    setVacation(props.vacation);
  }, []);

  async function deleteVacation() {
    try {
      if (!window.confirm("Are you sure?")) return;
      await vacationService.deleteVacation(props.vacation.vacationId);
      notifyService.success("Vacation has been Deleted!");
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
  }

  return (
    <div className="SmallVacationCard Box">
      <div className="buttonsSmallCard">
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
              <NavLink to={"/vacations/update/" + props.vacation.vacationId}>
                <button>✏️</button>
              </NavLink>{" "}
              <button onClick={deleteVacation}>❌</button>
            </>
          )}
      </div>
      <div>
        From: {props.vacation.startDate}
        <br />
        To: {props.vacation.endDate}
        <br />
        Price: ${props.vacation.price}
      </div>
    </div>
  );
}

export default SmallVacationCard;
