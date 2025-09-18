import React from "react";
import '../tourView.css'

function Accordion(props) {
  return (
    <div className="row">
      <div className="col-12 col-md-8">
        <div
          class="card bg-light"
          id="ItineraryDetails"
          data-aos="fade-right"
          data-aos-delay="300"
          data-aos-duration="1000"
        >
          <div class="card-body">
            <h4 class="card-title mb-4">Day Wise Itinerary</h4>
            <div class="accordion accordion-flush " id="accordionFlushExample">
              {props.itinerary.map((item, index) => {
                return (
                  <div class="accordion-item mb-1 dayWiseItinerary">
                    <h2 class="accordion-header" id={`flush-heading${index}`}>
                      <button
                        class="accordion-button collapsed fw-bold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#flush-collapse${index}`}
                        aria-expanded="false"
                        aria-controls={`flush-collapse${index}`}
                      >
                        Day&nbsp;{item.day}
                      </button>
                    </h2>
                    <div
                      id={`flush-collapse${index}`}
                      class="accordion-collapse collapse"
                      aria-labelledby={`flush-heading${index}`}
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body bg-light dayWiseItineraryText">
                        {item.activities}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
