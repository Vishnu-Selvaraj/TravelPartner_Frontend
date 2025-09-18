import React from "react";
import axios from "axios";
import "./modal.css";

const Modal = (props) => {

  const token = JSON.parse(localStorage.getItem("userToken"));

  const handleClick = () => {
    if(props.handleLogout){
      props.handleLogout()
    }else{
      props.cancelBooking()
    }
  };

  return (
    <div>
      {/* =============================================== Common Modal for logout and cancel booking ===================================================  */}

      <div
        className="modal fade"
        id={props.modalId}
        tabindex="-1"
        aria-labelledby="LogoutModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" id="logoutModalContentBox">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close closeBtn"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-4">
              <h5 className="modal-title text-center" id="LogoutModalLabel">
                {props.message}
              </h5>
              <div className="d-flex justify-content-center gap-5 mt-4">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleClick}
                  data-bs-dismiss="modal"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
