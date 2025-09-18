import React, { useEffect, useState } from "react";
import BookingsCard from "../Booking_card/BookingsCard";
import axios from "axios";
import "./allBookings.css";
import Search from "../search/Search";
import Modal from "../Modal/Modal";
import toast from "react-hot-toast";
import "../loader/loader.css";
import LoaderAnimation from "../LoaderAnimation/LoaderAnimation";

function AllBookings() {
  const [selectedOption, setSelectedOption] = useState("Upcoming");

  const [userBookingData, setUserBookingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [userBookingId, setUserBookingId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const token = JSON.parse(localStorage.getItem("userToken"));

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    if (token) {
      fetchBookingData();
      /* ============= This below step provided to avoid the mixing of data in states 
      Giving like this will clear state data every time and only update data to the state
      that get from backend ========================*/
      setUserBookingData([]);
      setFilteredData([]);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } else {
      console.log("Unauthorized access");
    }
  }, [selectedOption]);

  const fetchBookingData = async () => {
    var options = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/get-all-user-booking/${selectedOption}/`,
        options
      );
      console.log(response.data);
      setErrorMessage("");
      setUserBookingData(response.data.user_booking_data);
      setFilteredData(response.data.user_booking_data);
    } catch (error) {
      console.log(error);
      setUserBookingData([]);
      if (isLoading) {
        setTimeout(() => {
          setErrorMessage(error.response.data.error);
        }, 1500);
      }
    }
  };

  console.log(selectedOption);

  /*===================================== Function handle search ** Serach Term send from Search component as argument of call back function passed as props============================================= */

  const handleBookingsSearch = (searchTerm) => {
    const normalizeSearchTerm = searchTerm.trim().toLowerCase();
    if (normalizeSearchTerm === "") {
      setFilteredData(userBookingData);
    } else {
      var dataRelatedToSearchTerm = userBookingData.filter((data) =>
        data.place_name.trim().toLowerCase().includes(normalizeSearchTerm)
      );
      console.log(dataRelatedToSearchTerm);
      setFilteredData(dataRelatedToSearchTerm);
    }
  };

  const getUserBookingID = (booking_id) => {
    setUserBookingId(booking_id);
  };

  const cancelBooking = async () => {
    var token = JSON.parse(localStorage.getItem("userToken"));
    var options = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    console.log(userBookingId);

    if (token) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/cancel-user-booking/",
          { user_booking_id: userBookingId },
          options
        );
        console.log(response);
        toast.success(response.data.message, {
          style: {
            borderRadius: "10px",
            background: "rgba(255, 255, 255, 0.95)",
            fontWeight: "400",
            color: "#111",
          },
        });
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
          backdrop.remove(); // Remove the backdrop manually
        }

        // This below function that update the state
        let filterBookings = filteredData?.filter(
          (bookings) => bookings.booking_id != userBookingId
        );
        setFilteredData(filterBookings);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error, {
          style: {
            borderRadius: "10px",
            background: "rgba(255, 255, 255, 0.95)",
            fontWeight: "400",
            color: "#111",
          },
        });
      }
    } else {
      console.log("Unauthorized access");
    }
  };

  return (
    <>
      <Search handleBookingsSearch={handleBookingsSearch} />
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col text-center fw-bold fs-1 bookingHeading">
            Bookings
          </div>
        </div>
        <div className="row">
          <div className="col-8 col-md-9 col-lg-10"></div>
          <div className="col-4 col-md-3 col-lg-2 d-flex justify-content-end mb-3 bookingDropdown">
            {/* ================================== Dropdown =============================== */}

            <select
              className="form-select form-select-sm border-light bg-light"
              value={selectedOption}
              onChange={(evt) => (
                setSelectedOption(evt.target.value),
                setIsLoading(true),
                setErrorMessage("")
              )}
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Previous">Previous</option>
            </select>
          </div>
        </div>

        {errorMessage && (
          <div className="text-center text-light mt-3 fw-bold display-6 errorText">
            {errorMessage}
          </div>
        )}

        {/*============================== **Loader provided to avoid the flutter effect on change on data when data fetch from backend according to the dropdown select** ================================ */}
        {isLoading ? (
          <div className="mainDiv row">
            <div className="col-md-2 col-4 mx-auto">
              {/* <div className="loader"></div> */}
              <LoaderAnimation />
            </div>
          </div>
        ) : (
          <>
            <div className="upcomingCard">
              {selectedOption === "Upcoming" && userBookingData.length > 0 && (
                <BookingsCard
                  filteredData={filteredData}
                  selectedOption={selectedOption}
                  getUserBookingID={getUserBookingID}
                />
              )}
            </div>
            {selectedOption === "Previous" && userBookingData.length > 0 && (
              <BookingsCard
                filteredData={filteredData}
                selectedOption={selectedOption}
              />
            )}
          </>
        )}
      </div>
      <Modal
        modalId="cancelModal"
        message="Are you sure you want to cancel your booking?"
        cancelBooking={cancelBooking}
      />
    </>
  );
}

export default AllBookings;
