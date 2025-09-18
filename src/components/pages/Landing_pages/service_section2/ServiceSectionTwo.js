import React from "react";
import { GiCommercialAirplane } from "react-icons/gi";
import { GiTwoCoins } from "react-icons/gi";
import { RiCustomerService2Fill } from "react-icons/ri";
import { BiSolidOffer } from "react-icons/bi";
import "./ServiceSectionTwo.css";

const ServiceSectionTwo = () => {
  return (
    <div className="row mt-4 text-center">
      <div className="col-6 col-lg-3" data-aos="zoom-in-down"
                  data-aos-duration="3000"
                  data-aos-delay="400">
        <div class="card border border-primary serviceCard">
          <div class="card-body">
            <div className="display-4 text-center text-primary mb-3">
              <GiCommercialAirplane />
            </div>
            <h5 class="card-title fw-bold">Easy Booking</h5>
            <p class="card-text text-secondary serviceSectionTwopara">
              We offer easy and convenient flight bookings with attractive
              offers.
            </p>
          </div>
        </div>
      </div>
      <div className="col-6 col-lg-3 mb-3" data-aos="zoom-in-down"
                  data-aos-duration="3000"
                  data-aos-delay="600">
        <div class="card border border-primary serviceCard">
          <div class="card-body">
            <div className="display-4 text-center text-primary mb-3">
              <GiTwoCoins />
            </div>
            <h5 class="card-title fw-bold">Lowest Price</h5>
            <p class="card-text text-secondary serviceSectionTwopara">
              We offer low rates on hotel reservations, holiday packages, and
              flight tickets.
            </p>
          </div>
        </div>
      </div>
      <div className="col-6 col-lg-3" data-aos="zoom-in-down"
                  data-aos-duration="3000"
                  data-aos-delay="800">
        <div class="card border border-primary serviceCard">
          <div class="card-body">
            <div className="display-4 text-center text-primary mb-3">
              <RiCustomerService2Fill />
            </div>
            <h5 class="card-title fw-bold">24/7 Support</h5>
            <p class="card-text text-secondary serviceSectionTwopara">
              Get 24/7 assistance for all your travel queries. We're happy to
              help.
            </p>
          </div>
        </div>
      </div>
      <div
        className="col-6 col-lg-3"
        data-aos="zoom-in-down"
        data-aos-duration="3000"
        data-aos-delay="1000"
      >
        <div class="card border border-primary serviceCard">
          <div class="card-body">
            <div className="display-4 text-center text-primary mb-3">
              <BiSolidOffer />
            </div>
            <h5 class="card-title fw-bold">Exciting Deals</h5>
            <p class="card-text text-secondary serviceSectionTwopara">
              Enjoy great deals on flights, hotels, buses, car rentals, and tour
              packages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSectionTwo;
