import React, { useEffect, useState } from "react";

import "./profileandChangepassword.css";
import axios from "axios";
import { Axios } from "../../axiosInstance/AxiosInstance";
import CheckAuth from "../auth/ChechAuth/CheckAuth";

const Profile = (props) => {
  const token = JSON.parse(localStorage.getItem("userToken"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const fetchData = async () => {
    var options = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    try {
      const response = await Axios.get("get-user-data", options);
      //Setting the name,email,phone_number values on state if directly given it would be undefined
      setEmail(response.data.data.email);
      setName(response.data.data.name);
      setPhoneNumber(response.data.data.phone_number);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    } else {
      console.log("Unauthorized access");
    }
  }, []);

  const handleUserDataChanges = async () => {
    var options = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    try {
      const updateResponse = await Axios.post(
        "edit-user-data",
        {
          name: name,
          email: email,
          phoneNumber: phoneNumber,
        },
        options
      );
      props.handleToast(updateResponse.data.message, "success");
    } catch (error) {
      props.handleToast(error.response.data.error);
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row d-flex justify-content-center">
        <div className=" col-12 col-sm-10">
          <div className="card py-3 profileCard">
            <div className="card-body">
              <h5 className="card-title fs-2 text-center profileCardHeading">
                Profile Information
              </h5>
              <form className="d-flex justify-content-between flex-wrap mt-4">
                <div className="mb-3 col-5">
                  <label for="userName" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="userName"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(evt) => setName(evt.target.value)}
                  />
                </div>
                <div className="mb-3 col-5">
                  <label for="phoneNumber" className="form-label">
                    Phone Number:
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    placeholder="Enter your Ph.No"
                    value={phoneNumber}
                    onChange={(evt) => setPhoneNumber(evt.target.value)}
                  />
                </div>
                <div className="mb-3 col-5">
                  <label for="userEmail" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="userEmail"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                  />
                </div>
              </form>
              <div className="d-flex justify-content-center mt-4 ">
                <button
                  type="submit"
                  className="btn btn-outline-primary saveChangesBtn"
                  onClick={handleUserDataChanges}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckAuth(Profile);
