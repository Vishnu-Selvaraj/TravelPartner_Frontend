import React, { useState } from "react";

import { TiWarningOutline } from "react-icons/ti";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import "../../User/profileandChangepassword.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Axios } from "../../../axiosInstance/AxiosInstance";

function ChangePassword(props) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConf, setNewPasswordConf] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Below function check whether password strong or not
  const is_password_strong = (password) => {
    var pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (pattern.test(password)) {
      return true;
    }
    return false;
  };

  const handleChangePassword = async (evt) => {
    evt.preventDefault();

    const token = JSON.parse(localStorage.getItem("userToken"));

    if (token) {
      var options = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      if (!currentPassword && !newPasswordConf && !newPasswordConf) {
        setError("Please fill all the fields.");
      } else if (!currentPassword) {
        setError("Current password field required.");
      } else if (!newPassword) {
        setError("New password field required.");
      } else if (!newPasswordConf) {
        setError("New password confirm field required.");
      } else if (newPassword !== newPasswordConf) {
        setError("Passwords do not Match!");
      } else if (!is_password_strong(newPassword)) {
        setError(
          "Password is too weak.Password must be at least 8 characters long with at least one capital letter and symbol"
        );
      } else {
        try {
          setError("");
          const response = await Axios.post(
            "change-password",
            {
              currentPassword: currentPassword,
              newPassword: newPassword,
            },
            options
          );

          setSuccessMessage(response.data.message);
          setCurrentPassword("");
          setNewPassword("");
          setNewPasswordConf("");
          props.handleToast(response.data.message, "success");
          // console.log(response)
        } catch (error) {
          setError(error.response.data.error);
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="row d-flex justify-content-center">
        <div className="col-11 col-sm-10 col-md-8" id="loginCard">
          <div className="card py-3 text-white" id="changePasswordInnerCard">
            <div className="card-body">
              <h5 className="text-center card-title fs-2 mb-4 changePasswordHeading">
                Change Password
              </h5>
              {/*=================================== change password form alert start =============================== */}

              {error && (
                <div
                  className="alert alert-danger d-flex justify-content-center align-items-center fade show"
                  role="alert"
                >
                  <div>
                    <TiWarningOutline className="fs-3 pe-1" />
                    <span className="ps-1">{error}</span>
                  </div>
                  {/* <span type="button" data-bs-dismiss="alert" aria-label="Close"><IoIosClose className="fs-3"/></span> */}
                </div>
              )}

              {/*=================================== change password form alert end =============================== */}

              {/*=================================== change password form  =============================== */}

              <form method="post">
                <label
                  htmlFor="currentPassword"
                  className="form-label text-dark"
                >
                  Current Password:
                </label>
                <input
                  className="form-control form-control-sm mb-4 "
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  placeholder="Enter your Current password"
                  autoComplete="off"
                  value={currentPassword}
                  onChange={(evt) => setCurrentPassword(evt.target.value)}
                />
                <label htmlFor="newPassword" className="form-label text-dark">
                  New Password:
                </label>
                <input
                  className="form-control form-control-sm mb-4 "
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  placeholder="Enter your new password"
                  autoComplete="off"
                  value={newPassword}
                  onChange={(evt) => setNewPassword(evt.target.value)}
                />
                <label htmlFor="passwordConf" className="form-label text-dark">
                  Confirm Password:
                </label>
                <input
                  className="form-control form-control-sm mb-4 "
                  type="password"
                  name="newPasswordConf"
                  id="newPasswordConf"
                  placeholder="Confirm your new password"
                  autoComplete="off"
                  value={newPasswordConf}
                  onChange={(evt) => setNewPasswordConf(evt.target.value)}
                />
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-outline-primary "
                    id="updateBtn"
                    onClick={handleChangePassword}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
