import React from 'react'
import serviceImg from '../../../../images/service img1.jpg'
import './ServiceSection.css'

const ServiceSection = () => {
  return (
    
        <div className="row p-2">
          <div className="col-12 col-sm-7 col-md-6 d-flex justify-content-center align-items-center">
            <div>
              <h2
                className="display-5 fw-bold mb-3"
                data-aos="fade-right"
                data-aos-duration="2000"
              >
                With all our experiance we will serve you.
              </h2>
              <p
                className="mb-3 fst-italic"
                data-aos="fade-right"
                data-aos-duration="2500"
              >
                Our team of travel experts is dedicated to crafting itineraries
                that reflect your interests and needs. We carefully select the
                best destinations, accommodations, and activities, ensuring that
                every aspect of your trip is exceptional. From the moment you
                book to the final destination, we are here to guide and assist
                you every step of the way.
              </p>
              <div className="d-flex justify-content-center gap-4 mt-4">
                <div
                  data-aos="zoom-in-down"
                  data-aos-duration="3000"
                  data-aos-delay="300"
                >
                  <h5 className="serviceExp ms-3 bg-primary">20k+</h5>
                  <p>Successful trips</p>
                </div>
                <div
                  data-aos="zoom-in-down"
                  data-aos-duration="3000"
                  data-aos-delay="700"
                >
                  <h5 className="serviceExp ms-3 bg-primary">5k+</h5>
                  <p>Regular clients</p>
                </div>
                <div
                  data-aos="zoom-in-down"
                  data-aos-duration="3000"
                  data-aos-delay="1000"
                >
                  <h5 className="serviceExp ms-3 bg-primary">10+</h5>
                  <p>Year Experience</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-12 col-sm-5 col-md-6 d-flex justify-content-center align-items-center"
            data-aos="fade-up-left"
            data-aos-duration="3000"
          >
            <img
              src={serviceImg}
              className="img-fluid  w-100"
              alt="service-image"
            />
          </div>
        </div>
    
  )
}

export default ServiceSection;