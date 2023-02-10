import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../../Models/VacationModel";
import {
  VacationActionType,
  vacationStore,
} from "../../../../Redux/VacationState";
import notifyService from "../../../../Services/NotifyService";
import vacationService from "../../../../Services/VacationService";
import useVerifyLoggedIn from "../../../../Utils/useVerifyLoggedIn";
import useVerifyTokenExpiry from "../../../../Utils/useVerifyTokenExpiry";
import Pagination from "../../../Pagination/Pagination";
import VacationCard from "../VacationCard/VacationCard";
import "./FollowedVacations.css";

function FollowedVacations(): JSX.Element {
  useVerifyTokenExpiry();
  useVerifyLoggedIn();
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [filter, setFilter] = useState<string>("dateAsc");
  const [cardsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const navigate = useNavigate();
  const currentCard = vacations.slice(firstCardIndex, lastCardIndex);

  useEffect(() => {
    vacationStore.dispatch({ type: VacationActionType.EmptyStore });

    vacationService
      .getAllFollowedVacations(filter)
      .then((vacations) => setVacations(vacations))
      .catch((err) => notifyService.error(err));

    if (vacations === undefined) {
      navigate("/home");
    }

    unsubscribe();
  }, []);

  const unsubscribe = vacationStore.subscribe(() => {
    let duplicateVacations = [...vacations];
    setVacations(duplicateVacations);
  });

  async function reRender() {
    await vacationService
      .getAllFollowedVacations(filter)
      .then((vacations) => setVacations(vacations))
      .catch((err) => notifyService.error(err));
  }

  async function onFilterChange(args: string) {
    await vacationService
      .getAllFollowedVacations(args)
      .then((vacations) => setVacations(vacations))
      .catch((err) => notifyService.error(err));
    setFilter(args);
  }

  return (
    <div className="FollowedVacations">
      {vacations.length === 0 ? (
        <>
          <h2>You're currently not following any vacations...</h2>
          <NavLink to={"/vacations/"}>
            <p>Click here to browse our vacations.</p>
          </NavLink>
        </>
      ) : (
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

          <div></div>
          <div className="list">
            {currentCard.map((v) => (
              <VacationCard
                key={v.vacationId}
                vacation={v}
                trigger={reRender}
              />
            ))}
          </div>
          <div className="paginationDiv">
            {vacations.length >6 && (
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
        </>
      )}
    </div>
  );
}

export default FollowedVacations;
