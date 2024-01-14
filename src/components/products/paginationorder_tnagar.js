import React from "react";
import { Link } from "react-router-dom";

const PaginationOrder_tnagar = (props) => {
  const { page, pages, keyword = "" } = props;
  const showPagination = pages > 1;

  /** 
  return (
    pages > 1 && (
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(pages).keys()].map((x) => (
            <li
              className={`page-item ${x + 1 === page ? "active" : ""}`}
              key={x + 1}
            >
              <Link
                className="page-link"
                to={
                  keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                }
              >
                {x + 1}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
  */
  const maxPageLinks = 5;

  // Calculate the start and end page numbers for the current set of links
  const startPage = Math.max(1, page - Math.floor(maxPageLinks / 2));
  const endPage = Math.min(pages, startPage + maxPageLinks - 1);

  return (
    showPagination && (
      <nav>
        <ul className="pagination justify-content-center">
          {page > 1 && (
            <li className="page-item">
              <Link
                className="page-link"
                to={
                  keyword
                    ? `/search/${keyword}/pageot/${page - 1}`
                    : `/pageot/${page - 1}`
                }
              >
                Previous
              </Link>
            </li>
          )}

          {[...Array(endPage - startPage + 1).keys()].map((index) => {
            const pageNumber = startPage + index;
            return (
              <li
                className={`page-item ${pageNumber === page ? "active" : ""}`}
                key={pageNumber}
              >
                <Link
                  className="page-link"
                  to={
                    keyword
                      ? `/search/${keyword}/pageot/${pageNumber}`
                      : `/pageot/${pageNumber}`
                  }
                >
                  {pageNumber}
                </Link>
              </li>
            );
          })}

          {page < pages && (
            <li className="page-item">
              <Link
                className="page-link"
                to={
                  keyword
                    ? `/search/${keyword}/pageot/${page + 1}`
                    : `/pageot/${page + 1}`
                }
              >
                Next
              </Link>
            </li>
          )}
        </ul>
      </nav>
    )
  );
};

export default PaginationOrder_tnagar;
