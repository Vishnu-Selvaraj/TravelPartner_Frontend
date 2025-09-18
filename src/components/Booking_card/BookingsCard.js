import React from "react";
import { Link } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import notFoundImg from '../../images/data_not_found.jpg'
import "./bookingCards.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Axios } from "../../axiosInstance/AxiosInstance";


function BookingsCard(props) {
  var token = JSON.parse(localStorage.getItem('userToken'))

  const handlePdfDownload = async (booking_id,place_name)=>{
    var options = {
      headers:{
        Authorization:`Token ${token}`
      }
    }
    try{
      const response = await Axios.get(`get-user-booking-pdf/${booking_id}/`,options) 

      //Download pdf from backend
      let bool = new Blob([response.data],{type:'application/pdf'})
      const Url = window.URL.createObjectURL(bool)
      const link = document.createElement('a')
      link.href = Url
      link.download = `${place_name} booking.pdf`
      document.body.appendChild(link);
      link.click()
      document.body.appendChild(link);

    }catch(error){
      console.log(error)
    }
  }

  //Invoke and pass booking_id to call back function **getUserBookingID**

  const handleCancelBooking = (booking_id)=>{
    props.getUserBookingID(booking_id)

  }

  return (
    <div className="row">
      { props.filteredData.length > 0 ? (
        props.filteredData.map((item, index) => (
          <div
            className="col-8 col-sm-6 col-md-5 col-lg-4 col-xl-3 mt-5"
            id="BookingcardColumn"
            key={index}
          >
            <div className="card" id="BookingmainCard">
            <>
                  <Link className="btn text-primary fw-bold btn-sm rounded-pill status">
                    {props.selectedOption}
                  </Link>
                  <Link to={`/tour-view-page/${item.id}`} className=" stretched-link">
                    <img
                      src={`${process.env.REACT_APP_API_IMAGE_BASE_URL}${item.image}`}
                      className="card-img-top"
                      id="card-image"
                      alt="bookingImg"
                    />
                  </Link>
                  <div class="card-body" id="cardBody">
                    <div className="d-flex justify-content-center mt-1">
                      <h4 className="card-title">
                        <SlLocationPin className="text-primary title-icon" />
                        &nbsp;{item.place_name}
                      </h4>
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                      <h6 style={{ fontSize: "medium" }}>Booking ID</h6>
                      <h6 className="pe-2">:</h6>
                      <h6>{item.booking_id}</h6>
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                      <h6 style={{ fontSize: "medium" }}>Trip Date</h6>
                      <h6 className="pe-2">:</h6>
                      <h6>{new Date(item.trip_start_date).toLocaleDateString("en-GB", {
                                  //For date formating
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })}</h6>
                    </div>
                    {/* ============================ Card download & Cancel button ===================== */}
                    <hr />
                    <div className={`${props.selectedOption === 'Previous' ? 'd-grid' :"d-md-flex justify-content-md-between d-grid"}`} key={index}>
                      <button
                        className="text-center btn btn-outline-primary btn-sm"
                        style={{ zIndex: "1" }}
                        onClick={()=>handlePdfDownload(item.booking_id,item.place_name)}
                      >
                        Download pdf
                      </button>
                    {/*============================Show and hiding the cancel button=================================== */}
                      {
                        props.selectedOption === 'Previous' ? (
                          ''
                        ):(
                          <button
                        className="text-center btn btn-outline-danger btn-sm mt-3 mt-md-0"
                        style={{ zIndex: "1" }}
                        onClick={()=>handleCancelBooking(item.booking_id)}
                        data-bs-toggle="modal" 
                        data-bs-target="#cancelModal"
                      >
                        Cancel booking
                      </button>
                        )
                      }
                      
                    </div>
                  </div>
                </>
            </div>
          </div>
        ))

      ):(
        <div className="container">
            <div className="row">
              
              <div className="col mt-5 text-center py-4">
                <img src={notFoundImg} alt="notFound" className="notFoundImage" />
              <div className="text-secondary h5 notFoundText">No data Found</div>
              </div>
            </div>
          </div>
      )

    }
    </div>
  );
}

export default BookingsCard;
