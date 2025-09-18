import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import "./search.css";

function Search(props) {
  const [seachTerm, setSearchTerm] = useState("");

  // Get the elements
  var wrapElement = document.querySelector(".wrap");
  var inputElement = document.querySelector(".input");
  var textInput = document.querySelector("input[type='text']");

  // Add click event listener to the search icon
  const handleClick = () => {
    // Toggle the 'active' class on .wrap and .input elements
    wrapElement.classList.toggle("active");
    // inputElement.classList.toggle("active");

    // Focus on the text input
    textInput.focus();
  };

  /*========= This useEffect hook that send the input term into the handleSerach function in TourList component ==================*/
  useEffect(() => {
    if (props.isTourListComponent) {
      props.handleSearch(seachTerm);
    } else {
      props.handleBookingsSearch(seachTerm);
    }
  }, [seachTerm]);

  console.log(props);

  return (
    <div class="wrap">
      <form>
        <input
          type="text"
          class="input"
          placeholder="Enter place name"
          onChange={(evt) => setSearchTerm(evt.target.value)}
        />
      </form>
      <IoMdSearch className="search-icon" onClick={handleClick} />
    </div>
  );
}

export default Search;
