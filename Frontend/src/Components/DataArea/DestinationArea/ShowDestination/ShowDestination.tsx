import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import DestinationModel from "../../../../Models/DestinationModel";
import VacationModel from "../../../../Models/VacationModel";
import { authStore } from "../../../../Redux/AuthState";
import {
  VacationActionType,
  vacationStore,
} from "../../../../Redux/VacationState";
import destinationService from "../../../../Services/DestinationService";
import notifyService from "../../../../Services/NotifyService";
import vacationService from "../../../../Services/VacationService";
import Spinner from "../../../HomeArea/Spinner/Spinner";
import Pagination from "../../../Pagination/Pagination";
import SmallVacationCard from "../../VacationArea/SmallVacationCard/SmallVacationCard";
import "./ShowDestination.css";
import useVerifyLoggedIn from "../../../../Utils/useVerifyLoggedIn";
import useVerifyTokenExpiry from "../../../../Utils/useVerifyTokenExpiry";
import appConfig from "../../../../Utils/appConfig";

function ShowDestination(): JSX.Element {
  useVerifyTokenExpiry();
  useVerifyLoggedIn();
  const params = useParams();
  const [destination, setDestination] = useState<DestinationModel>();
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [filter, setFilter] = useState<string>("dateAsc");
  const [cardsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCard = vacations.slice(firstCardIndex, lastCardIndex);
  const navigate = useNavigate();

  useEffect(() => {
    vacationStore.dispatch({ type: VacationActionType.EmptyStore });

    const id = +params.destinationId;
    destinationService
      .getOneDestination(id)
      .then((destination) => setDestination(destination))
      .catch((err) => notifyService.error(err));

    if (authStore.getState().token) {
      vacationService
        .getAllVacations(filter, id)
        .then((vacations) => setVacations(vacations))
        .catch((err) => notifyService.error(err));
    }

    unsubscribe();
  }, []);

  async function deleteDestination() {
    try {
      if (!window.confirm("Are you sure?")) return;
      await destinationService.deleteDestination(destination.destinationId);
      notifyService.success("Destination has been Deleted!");
      navigate("/destinations");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  const unsubscribe = vacationStore.subscribe(() => {
    let duplicateVacations = [...vacations];
    setVacations(duplicateVacations);
  });

  async function onFilterChange(args: string) {
    vacationService
      .getAllVacations(args, destination.destinationId)
      .then((vacations) => setVacations(vacations))
      .catch((err) => notifyService.error(err));
    setFilter(args);
  }

  return (
    <div className="ShowDestination">
      <div className="BoxDiv">
        {!destination ? (
          <Spinner />
        ) : (
          <>
            <div>
              <img src={appConfig.imagesUrl + destination.imageName} />
            </div>
            <div>
              <h2>{destination.destinationName}</h2>

              <h4>About this destination:</h4>
              <p>{destination.description}</p>
            </div>

            {authStore.getState().token &&
              authStore.getState().user.role === "Admin" && (
                <div className="buttons">
                  <NavLink
                    to={"/destinations/update/" + destination.destinationId}
                  >
                    <button>✏️</button>
                  </NavLink>
                  <button onClick={deleteDestination}>❌</button>
                </div>
              )}
          </>
        )}
      </div>

      {authStore.getState().token && vacations.length === 0 && (
        <>
          <h2>Sorry, we currently have no vacations to that destination.</h2>
          <NavLink to={"/destinations"}>
            <h3>Click here to return</h3>
          </NavLink>
        </>
      )}

      <div>
        {vacations.length > 0 && (
          <>
            <div className="filterSelect">
              <select
                defaultValue={filter}
                onChange={(e) => {
                  onFilterChange(e.target.value);
                }}
              >
                <option value={"dateAsc"}>By Date (Ascending)</option>
                <option value={"dateDesc"}>By Date (Descending)</option>
                <option value={"priceAsc"}>By Price (Ascending)</option>
                <option value={"priceDesc"}>By Price (Descending)</option>
              </select>
            </div>
            <div className="smallList">
              {currentCard.map((v) => (
                <SmallVacationCard key={v.vacationId} vacation={v} />
              ))}
            </div>
          </>
        )}
        <div className="paginationDiv">
          {vacations.length > 8 && (
            <>
              <Pagination
                totalCards={vacations.length}
                cardsPerPage={cardsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowDestination;
