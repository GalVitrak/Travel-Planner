import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import DestinationModel from "../../../../Models/DestinationModel";
import { authStore } from "../../../../Redux/AuthState";
import {
  DestinationsActionType,
  destinationStore,
} from "../../../../Redux/DestinationState";
import destinationService from "../../../../Services/DestinationService";
import notifyService from "../../../../Services/NotifyService";
import useVerifyTokenExpiry from "../../../../Utils/useVerifyTokenExpiry";
import Spinner from "../../../HomeArea/Spinner/Spinner";
import Pagination from "../../../Pagination/Pagination";
import DestinationCard from "../DestinationCard/DestinationCard";
import "./DestinationList.css";

function DestinationList(): JSX.Element {
  useVerifyTokenExpiry();
  const [destinations, setDestinations] = useState<DestinationModel[]>([]);
  let duplicateDestinations: DestinationModel[] = [];
  const [cardsPerPage] = useState(6); // Sets a state for cards per page.
  const [currentPage, setCurrentPage] = useState<number>(1); // Sets a state for current page number which will be updated when necessary.
  const lastCardIndex = currentPage * cardsPerPage; // Calculates index of first and last card by multiplying current page number with cardsPerPage variable.
  const firstCardIndex = lastCardIndex - cardsPerPage; // Calculates index of first card by subtracting cardsPerPage from lastCardIndex
  const currentCard = destinations.slice(firstCardIndex, lastCardIndex); // Creates a new array of vacations with the vacations between the calculated indices.

  useEffect(() => {
    destinationStore.dispatch({ type: DestinationsActionType.EmptyStore });

    destinationService
      .getAllDestinations()
      .then((destinations) => setDestinations(destinations))
      .catch((err) => notifyService.error(err));

    unsubscribe();
  }, []);

  const unsubscribe = destinationStore.subscribe(() => {
    duplicateDestinations = [...destinations];
    setDestinations(duplicateDestinations);
  });
  return (
    <div className="DestinationList">
      <div>
        {authStore.getState().token &&
          authStore.getState().user.role === "Admin" && (
            <>
              <div className="addDiv">
                <NavLink to={"/destinations/add"}>
                  <button>Add Destination</button>
                </NavLink>
              </div>
            </>
          )}
      </div>
      {destinations.length === 0 ? (
        <>
          <div>
            <Spinner />
          </div>
        </>
      ) : (
        <>
          <div className="list">
            <>
              {currentCard.map((d) => (
                <DestinationCard key={d.destinationId} destination={d} />
              ))}
            </>
          </div>
          <div className="paginationDiv">
            {destinations.length > 6 && (
              <>
                <Pagination
                  totalCards={destinations.length}
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

export default DestinationList;
