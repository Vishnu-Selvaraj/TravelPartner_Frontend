import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Banner from "../single_banner/Banner";
import BannerImg from "../../../images/bookingConfBanner.jpg";

import { FaLeftRight } from "react-icons/fa6";
import { FaIndianRupeeSign } from "react-icons/fa6";
import "./BookingConfirmation.css";
import "../../loader/loader.css";
import axios from "axios";
import { Axios } from "../../../axiosInstance/AxiosInstance";
import LoaderAnimation from "../../LoaderAnimation/LoaderAnimation";

const BookingConfirmation = () => {
  const [bookingData, setBookingData] = useState({});
  const [placeName, setPlaceName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { tour_id } = useParams();

  const token = JSON.parse(localStorage.getItem("userToken"));

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2200);
      fetchBookingConfirmData();
    } else {
      console.log("Unauthorized access");
    }
  }, []);

  const fetchBookingConfirmData = async () => {
    var options = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    try {
      const response = await Axios.get(
        `get-confirmation-details/${tour_id}`,
        options
      );
      setBookingData(response.data.data);
      setPlaceName(response.data.place_name);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="BookingConfirmMainDiv">
      <Navbar />
      {isLoading ? (
        <div className="mainDiv row">
          <div className="col-md-2 col-4 mx-auto">
            {/* <div className="loader"></div> */}
            <LoaderAnimation />
          </div>
        </div>
      ) : (
        <>
          <Banner
            bannerImg={BannerImg}
            title={"Thank you for booking with us."}
          />

          {/* ====================================== Booking Details card ============================================ */}
          <div className="container bookingContainer position-absolute top-60 start-50 translate-middle">
            <div className="row">
              <div className="col-1 col-md-2"></div>
              <div className="col-10 col-md-8">
                <div class="card" id="bookingCard">
                  <div class="card-body">
                    <h5 class="card-title text-center fs-3 mt-2">
                      Booking Successful!
                    </h5>
                    <div className="row">
                      <div className="col-2"></div>
                      <div className="col-md-8 d-flex justify-content-center">
                        <table class="table mt-5 text-center vertical-align-center table-hover table-light">
                          <tbody>
                            <tr>
                              <td className="fw-bold">Booking ID</td>
                              <td>
                                <FaLeftRight className="text-primary" />
                              </td>
                              <td className="fw-bold">
                                {bookingData.booking_id}
                              </td>
                            </tr>
                            <tr>
                              <td>Destination</td>
                              <td>
                                <FaLeftRight className="text-primary" />
                              </td>
                              <td>{placeName}</td>
                            </tr>
                            <tr>
                              <td>No of Persons</td>
                              <td>
                                <FaLeftRight className="text-primary" />
                              </td>
                              <td>{bookingData.number_of_persons}</td>
                            </tr>
                            <tr>
                              <td>Total Price</td>
                              <td>
                                <FaLeftRight className="text-primary" />
                              </td>
                              <td>
                                <FaIndianRupeeSign className="text-secondary" />
                                {Number(bookingData.total_price).toFixed(0)}
                              </td>
                            </tr>
                            <tr>
                              <td>Booking Date</td>
                              <td>
                                <FaLeftRight className="text-primary" />
                              </td>
                              <td>
                                {new Date(
                                  bookingData.trip_start_date
                                ).toLocaleDateString("en-GB", {
                                  //For date formating
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <a
                        href="/tour-user-profile/mybookings"
                        className="btn btn-outline-success"
                      >
                        View all bookings
                      </a>
                      {/* <Link to='/tour-user-profile/mybookings' className="btn btn-outline-success">View all bookings</Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingConfirmation;
