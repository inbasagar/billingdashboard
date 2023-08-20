import React from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => {
  const { page, pages, keyword = "" } = props;
  const maxPageLinks = 5;
  const showPagination = pages > 1;
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
                    ? `/search/${keyword}/page/${page - 1}`
                    : `/page/${page - 1}`
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
                      ? `/search/${keyword}/page/${pageNumber}`
                      : `/page/${pageNumber}`
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
                    ? `/search/${keyword}/page/${page + 1}`
                    : `/page/${page + 1}`
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

export default Pagination;
