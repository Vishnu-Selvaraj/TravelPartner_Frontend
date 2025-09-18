import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { GiMeal } from "react-icons/gi";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa";
import { FaHotel } from "react-icons/fa6";
import { LiaRupeeSignSolid } from "react-icons/lia";
import notFoundImg from "../../images/data_not_found.jpg";
import "./card.css";
import LoaderAnimation from "../LoaderAnimation/LoaderAnimation";

const Card = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize AOS if it has been loaded
    if (window.AOS) {
      window.AOS.init();
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  console.log(props, "CARD");

  return (
    <div className="row">
      {props.TourData.length > 0 ? (
        props.TourData.map((item, index) => (
          <div
            className="col-8 col-sm-6 col-md-4 col-lg-4 col-xl-3 mt-5"
            data-aos="fade-up"
            data-aos-duration="2000"
            id="cardColumn"
          >
            <div className="card" id="mainCard" key={index}>
              <Link
                to={`/tour-view-page/${item.id}`}
                className=" stretched-link"
              >
                <img
                  src={`${process.env.REACT_APP_API_IMAGE_BASE_URL}${item.image}`}
                  className="card-img-top"
                  id="card-image"
                  alt={`${item.place_name}`}
                />
              </Link>
              <Link className="btn btn-sm rounded-pill card-days">
                {item.total_trip_days} Days
              </Link>
              <div class="card-body" id="cardBody">
                <div className="d-flex justify-content-center mt-1">
                  <h5 className="card-title">
                    <SlLocationPin className="text-primary title-icon" />
                    &nbsp;{item.place_name}
                  </h5>
                </div>
                {/* ============================ Card linear icons ===================== */}
                <div className="d-flex justify-content-center gap-4 fs-3 mt-3 mb-3 text-secondary">
                  <FaHotel />
                  <FaCarSide />
                  <FaMapMarkedAlt />
                  <GiMeal />
                </div>
                <hr />
                {/* ============================ Card price section ===================== */}

                <div
                  className="d-flex justify-content-between mt-1"
                  id="priceCardRow"
                >
                  <div>
                    <span className="fw-bold" style={{ fontSize: "small" }}>
                      Starting from
                    </span>
                    <div className="text-decoration-line-through">
                      <LiaRupeeSignSolid />
                      <span>{Number(item.price) + 12000}</span>
                    </div>
                  </div>
                  <div className="fw-bold d-flex">
                    <LiaRupeeSignSolid className="fw-bold fs-4 mt-1 pt-1" />
                    <span className="fs-5">
                      {Number(item.price).toFixed(0)}
                    </span>
                  </div>

                  {/* <Link to={'/'} id="bookingBtn">
                Book now
              </Link> */}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : isLoading ? (
        <div className="mainDiv row">
          <div className="col-md-2 col-4 mx-auto">
            {/* <div className="loader"></div> */}
            <LoaderAnimation />
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <div className="col mt-5 text-center py-4">
              <img src={notFoundImg} alt="notFound" className="notFoundImage" />
              <div className="text-secondary h5 notFoundText">
                No data Found
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
