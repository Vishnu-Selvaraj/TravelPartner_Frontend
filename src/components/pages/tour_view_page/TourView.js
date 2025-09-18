import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import img from "../../../images/bali img2.jpg";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FcClock } from "react-icons/fc";
import { GiMeal } from "react-icons/gi";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import { FaHotel } from "react-icons/fa6";

import "./tourView.css";
import Footer from "../Landing_pages/footer/Footer";
import Navbar from "../../Navbar/Navbar";
import Accordion from "./view_page_accordion/Accordion";
import axios from "axios";
import toast from "react-hot-toast";
import CheckAuth from "../../auth/ChechAuth/CheckAuth";
import { Axios } from "../../../axiosInstance/AxiosInstance";

function TourView() {
  const [tourData, setTourData] = useState({});
  const [tourItinerary, setTourItinerary] = useState([]);
  const [bookingBtnClicked, setBookingBtnClicked] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);
  const [noOfPersons, setNoofPersons] = useState(0);
  const [bookingDate, setBookingDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [minDate, setMinDate] = useState("");

  const navigate = useNavigate();

  const { tourId } = useParams();
  const token = JSON.parse(localStorage.getItem("userToken"));

  // To give an random price
  const { price } = tourData;
  const startPrice = 12000 + Number(price);

  useEffect(() => {
    // Initialize AOS if it has been loaded
    if (window.AOS) {
      window.AOS.init();
    }
    // To automatically scroll to the top
    window.scrollTo(0, 0);

    // Disable all previous dates before today
    let today = new Date();
    let formatedDate = today.toISOString().split("T")[0];
    // console.log(formatedDate)
    setMinDate(formatedDate);
  }, []);

  useEffect(() => {
    if (token) {
      fetchData();
    } else {
      console.log("Server error");
    }
  }, [token]);

  const fetchData = async () => {
    var options = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    try {
      const response = await Axios.get(
        `get-view-tour-details/${tourId}`,
        options
      );
      // console.log(response);
      setTourData(response.data.data.tour_data);
      setTourItinerary(response.data.data.itinerary);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async (evt) => {
    var options = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    if (!noOfPersons && !bookingDate) {
      toast.error("please fill all fields!", {
        className: "toastErrorMessage",
        position: "bottom-center",
      });
    } else if (noOfPersons == 0) {
      toast.error("no.of persons can't be 0.", {
        className: "toastErrorMessage",
        position: "bottom-center",
      });
    } else if (!noOfPersons) {
      toast.error("no of perons fields required.", {
        className: "toastErrorMessage",
        position: "bottom-center",
      });
    } else if (!bookingDate) {
      toast.error("Date fields required.", {
        className: "toastErrorMessage",
        position: "bottom-center",
      });
    } else {
      setBookingBtnClicked(true);
      try {
        const response = await Axios.post(
          `add-user-booking/${tourId}/`,
          {
            number_of_persons: noOfPersons,
            trip_start_date: bookingDate,
            total_price: totalPrice,
          },
          options
        );

        // console.log(response)
        setNoofPersons(0);
        setBookingDate("");

        {
          /* =============================================== In below removing the backdrop-effect by modal after click on book button ===================================================  */
        }

        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
          backdrop.remove(); // Remove the backdrop manually
        }

        toast.success(
          "A confirmation has been successfully sent to your email!",
          { position: "bottom-center" }
        );
        {
          /* =============================================== Redirecting to the confirmation page ===================================================  */
        }

        setTimeout(() => {
          setBookingBtnClicked(false);
          navigate(`/tour-booking-confirmation/${tourId}`);
        }, 2000);
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.error == "Phone number not provided.") {
          toast.error("Phone number not provided", { position: "top-center" });
        }
      }
    }
  };

  return (
    <div>
      <Navbar />
      {/* =============================================== Main heading ===================================================  */}
      <div className="container" id="Heading-container">
        <div className="row">
          <div className="col-6">
            <div
              className="display-6 fw-bold viewMainHeading"
              data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="1500"
            >
              {tourData.place_name}{" "}
              {/*<sup className="fs-5">{tourData.total_trip_days} Days</sup>*/}
            </div>
          </div>
        </div>
      </div>
      {/* =============================================== Left side Image column ===================================================  */}

      <div className="container mt-3">
        <div className="row">
          <div
            className="col-12 col-md-8"
            data-aos="zoom-in"
            data-aos-duration="3000"
          >
            <img
              src={`${process.env.REACT_APP_API_IMAGE_BASE_URL}${tourData.image}`}
              alt="viewImg"
              id="viewImage"
            />
          </div>
          {/* =============================================== rightside Cards ===================================================  */}
          <div className="col-12 col-md-4 mt-4 mt-md-0">
            {/* =============================================== rightside top card ===================================================  */}

            <div className="row">
              <div className="col-12 col-md-12">
                <div
                  className="card viewSideCard"
                  data-aos="fade-left"
                  data-aos-anchor="#example-anchor"
                  data-aos-delay="300"
                  data-aos-duration="2000"
                >
                  <div className="card-body">
                    <div className="card-text">Starting from</div>
                    <div className="d-flex">
                      <LiaRupeeSignSolid className="fs-5 mt-1" />
                      <span className="text-decoration-line-through fs-5">
                        {startPrice || (
                          <div className="text-light">Loading...</div>
                        )}
                      </span>
                    </div>
                    <h5 className="card-title fs-3 d-flex mt-3 fw-bold">
                      <LiaRupeeSignSolid className="fs-3 mt-1" />
                      {isNaN(Number(tourData.price).toFixed(0)) ? (
                        <div className="text-primary">Loading...</div>
                      ) : (
                        Number(tourData.price).toFixed(0)
                      )}
                      <span className="fw-normal fs-6 mt-2 ps-1 perPerson">
                        per person
                      </span>
                    </h5>
                    <div className="d-grid mt-4">
                      <Link
                        to={"/"}
                        className="btn btn-light btn-sm"
                        id="viewBookingBtn"
                        data-bs-toggle="modal"
                        data-bs-target="#BookingModal"
                        data-bs-whatever="@mdo"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* =============================================== Booking Modal ===================================================  */}

              <div
                className="modal fade"
                id="BookingModal"
                tabindex="-1"
                aria-labelledby="bookingModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="bookingModalLabel">
                        Complete the booking details
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="mb-3">
                          <label for="noOfPersons" className="col-form-label">
                            No of persons:
                          </label>
                          <input
                            type="number"
                            min="1"
                            className="form-control form-control-sm"
                            id="noOfPersons"
                            placeholder="Enter the number of persons"
                            value={noOfPersons}
                            onChange={(evt) => {
                              setTotalPrice(
                                evt.target.value * Number(tourData.price)
                              );
                              setNoofPersons(evt.target.value);
                            }}
                          />
                        </div>
                        <div className="mb-3">
                          <label for="bookingDate" className="col-form-label">
                            Select Date:
                          </label>
                          <input
                            type="date"
                            className="form-control form-control-sm"
                            id="bookingDate"
                            placeholder="Choose the date"
                            value={bookingDate}
                            onChange={(evt) => setBookingDate(evt.target.value)}
                            min={minDate}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label for="totalPrice" className="col-form-label">
                            Total Price:
                          </label>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            id="totalPrice"
                            placeholder="total Price"
                            value={totalPrice}
                            readOnly
                          />
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      {bookingBtnClicked ? (
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={handleBooking}
                          disabled
                        >
                          Book
                          <div
                            class="ms-1 spinner-border spinner-border-sm text-light"
                            role="status"
                          >
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={handleBooking}
                        >
                          Book
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* =============================================== rightside bottom Card  ===================================================  */}
              <div className="col-12 col-md-12 mt-md-4 mt-3">
                <div
                  className="card bg-light viewSideCard"
                  data-aos="fade-left"
                  data-aos-anchor="#example-anchor"
                  data-aos-delay="800"
                  data-aos-duration="2000"
                >
                  <div className="card-body">
                    <div className="card-text d-flex justify-content-center fs-5">
                      <FcClock style={{ marginTop: "0.35rem" }} />
                      &nbsp;
                      <span>Duration:&nbsp;{tourData.total_trip_days}Days</span>
                    </div>
                    <div
                      className="card-text d-grid gap-2 mt-4"
                      id="packageHeading"
                    >
                      <span className="btn btn-secondary rounded-pill ">
                        Package Includes
                      </span>
                    </div>
                    {/* ======================================= Icon row inside card =========================================== */}
                    <div className="row mt-3 ms-4 ps-3 ps-lg-0 ms-lg-3 ms-xl-5 mx-auto">
                      <div className="col-6 col-sm-12 col-lg-6 mb-3  mb-lg-4 ">
                        <FaHotel className="fs-5 text-primary" />
                        <span className="ps-3">Hotel</span>
                      </div>
                      <div className="col-6 col-sm-12 col-lg-6 mb-3  mb-lg-4 ">
                        <FaCarSide className="fs-5 text-primary" />
                        <span className="ps-3">Transfer</span>
                      </div>
                      <div className="col-6 col-sm-12 col-lg-6 mb-3">
                        <FaMapMarkedAlt className="fs-5 text-primary" />
                        <span className="ps-3">Explore</span>
                      </div>
                      <div className="col-6 col-sm-12 col-lg-6">
                        <GiMeal className="fs-5 text-primary" />
                        <span className="ps-3">Meal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ======================================= Description card =========================================== */}

      <div className="container mt-3">
        <div className="row">
          <div className="col-12 col-md-8">
            <div class="card bg-light" id="descriptionCard">
              <div class="card-body">
                <h4 class="card-title mb-3">Description</h4>
                <p class="card-text description-text">{tourData.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ======================================= Description card Ends=========================================== */}

      {/* ======================================= Day Wise Itinerary Accordion start=========================================== */}
      <div className="container mt-4">
        <Accordion itinerary={tourItinerary} />
      </div>
      {/* ======================================= Day Wise Itinerary Accordion Ends=========================================== */}

      {/* ======================================= View page footer =========================================== */}

      <div className="container-fluid mt-5" id="footerBody">
        <Footer />
      </div>
    </div>
  );
}

export default CheckAuth(TourView);
