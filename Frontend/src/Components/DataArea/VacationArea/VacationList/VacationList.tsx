import { useState, useEffect, ChangeEvent } from "react";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../../Models/VacationModel";
import { authStore } from "../../../../Redux/AuthState";
import {
  VacationActionType,
  vacationStore,
} from "../../../../Redux/VacationState";
import notifyService from "../../../../Services/NotifyService";
import vacationService from "../../../../Services/VacationService";
import useVerifyTokenExpiry from "../../../../Utils/useVerifyTokenExpiry";
import Spinner from "../../../HomeArea/Spinner/Spinner";
import Pagination from "../../../Pagination/Pagination";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";

function VacationList(): JSX.Element {
  useVerifyTokenExpiry();
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [filter, setFilter] = useState<string>("dateAsc");
  const [cardsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCard = vacations.slice(firstCardIndex, lastCardIndex);

  useEffect(() => {
    vacationStore.dispatch({ type: VacationActionType.EmptyStore });

    vacationService
      .getAllVacations(filter)
      .then((vacations) => setVacations(vacations))
      .catch((err) => notifyService.error(err));

    unsubscribe();
  }, []);

  const unsubscribe = vacationStore.subscribe(() => {
    let duplicateVacations = [...vacations];
    setVacations(duplicateVacations);
  });

  async function onFilterChange(args: string) {
    vacationService
      .getAllVacations(args)
      .then((vacations) => setVacations(vacations))
      .catch((err) => notifyService.error(err));
    setFilter(args);
  }

  return (
    <>
      <div className="VacationList">
        <div>
          {authStore.getState().token &&
            authStore.getState().user.role === "Admin" && (
              <>
                <div className="addDiv">
                  <NavLink to={"/vacations/add"}>
                    <button>Add Vacation</button>
                  </NavLink>
                </div>
              </>
            )}
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
        </div>
        <div>
          {vacations.length === 0 && (
            <>
              <div>
                <Spinner />
              </div>
            </>
          )}
        </div>
        <div className="list">
          {currentCard.map((v) => (
            <VacationCard key={v.vacationId} vacation={v} />
          ))}
        </div>
      </div>
      <div className="paginationDiv">
        {vacations.length > 6 && (
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
  );
}

export default VacationList;
