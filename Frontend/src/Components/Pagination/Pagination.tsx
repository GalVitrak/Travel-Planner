import { useRef } from "react";
import "./Pagination.css";

// Interface to specify props being passed into the Pagination Component.
interface PaginationProps {
  totalCards: number;
  cardsPerPage: number;
  setCurrentPage(num: number): any;
  currentPage: number;
}

// Pagination function returning a JSX element which takes in PaginationProps as arguments.
function Pagination(props: PaginationProps): JSX.Element {
  const myRef = useRef(null);
  const pages = []; // Pages array containing pages for paginating through data.
  for (let i = 1; i <= Math.ceil(props.totalCards / props.cardsPerPage); i++) {
    pages.push(i);
  }

  // Scrolls to view when clicking on different page numbers.
  const executeScroll = () => myRef.current.scrollIntoView();

  return (
    <>
      <div className="TopPage" ref={myRef}></div>
      <div className="paginationButtonsDiv">
        {pages.map((page) => {
          return (
            <button
              key={page}
              onClick={() => {
                props.setCurrentPage(page);
                executeScroll();
              }}
              className={page === props.currentPage ? "active" : ""}
            >
              {page}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default Pagination;
