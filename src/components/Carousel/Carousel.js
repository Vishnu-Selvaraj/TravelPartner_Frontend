import React, { useEffect, useState } from "react";
import "./carousel.css";
import LoaderAnimation from "../LoaderAnimation/LoaderAnimation";

function Carousel(props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Manually initialize the carousel
    const carouselElement = document.querySelector("#carouselExampleFade");
    const carousel = new window.bootstrap.Carousel(carouselElement, {
      interval: 2000,
      ride: "carousel", // Starts sliding automatically
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return isLoading ? (
    <div className="mainDiv row mt-5">
      <div className="col-md-2 col-3 mx-auto">
        {/* <div className="loader"></div> */}
        <LoaderAnimation />
      </div>
    </div>
  ) : (
    <>
      {/* =================================== Carousel start=========================================== */}
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade carousel-container"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {props.data?.map((items, index) => (
            <button
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
              key={index}
            ></button>
          ))}
        </div>

        <div className="carousel-inner c-container">
          {props.data?.map((items, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <img
                src={`${process.env.REACT_APP_API_IMAGE_BASE_URL}${items.image}`}
                className="d-block w-100 c-image"
                alt={`${items.place_name}`}
              />
              <div class="carousel-caption d-none d-md-block">
                <h1 className="display-1">{items.place_name}</h1>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* =================================== Carousel End=========================================== */}
    </>
  );
}

export default Carousel;
