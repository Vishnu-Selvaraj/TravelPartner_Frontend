import React, { useState } from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 2;
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const PaginationData = props.data.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(props.data.length / dataPerPage);
  const number = [...Array(numberOfPages + 1).keys()].slice(1);

  // Pagination Functions starts

  const handlePrev = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (num) => {
    setCurrentPage(num);
  };

  //Pagination Functions ends

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center mt-3">
          <li className="page-item">
            <Link className="page-link" onClick={handlePrev}>
              Prev
            </Link>
          </li>

          {number.map((num, index) => (
            <li
              className={`page-item ${currentPage === num ? "active" : ""}`}
              key={index}
            >
              <Link className="page-link" onClick={() => handlePageChange(num)}>
                {num}
              </Link>
            </li>
          ))}

          <li className="page-item">
            <Link className="page-link" onClick={handleNext}>
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
