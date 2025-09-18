import React, { useState } from "react";
import LoginImg from "../../../images/loginImg2.png";

import { TiWarningOutline } from "react-icons/ti";
import { IoIosClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import Navbar from "../../Navbar/Navbar";
import { Axios } from "../../../axiosInstance/AxiosInstance";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //LOGIN
  const handleLogin = async (evt) => {
    evt.preventDefault();

    if (!email) {
      setError("Email field required.");
    } else if (!password) {
      setError("Password field required.");
    } else {
      try {
        setError("");
        const response = await Axios.post("login", {
          email: email,
          password: password,
        });
        localStorage.removeItem("userToken");
        {
          /* Remove the null value and set the token */
        }
        localStorage.setItem("userToken", JSON.stringify(response.data.token));
        navigate("/");
      } catch (error) {
        setError(error.response.data.error);
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="container" id="loginContainer">
        <div className="row">
          <div className="col-1"></div>
          {/*=================================== Main column =============================== */}

          <div className="col-10 py-5" id="loginMainCol">
            <div className="row">
              {/*=================================== Left Img column =============================== */}
              <div className="col-12 col-md-6">
                <img
                  src={LoginImg}
                  className="rounded img-fluid"
                  alt="sideImg"
                  id="LoginSideImg"
                />
              </div>
              {/*=================================== Right form column =============================== */}
              <div className="col-12 col-md-6">
                <form
                  className="d-flex flex-column justify-content-center h-100 w-75 mx-auto"
                  id="loginForm"
                >
                  <h4 className="fs-1 mb-4">Login</h4>
                  {/*=================================== Login form alert start =============================== */}

                  {error && (
                    <div
                      className="alert alert-danger d-flex justify-content-between align-items-center fade show"
                      role="alert"
                    >
                      <div>
                        <TiWarningOutline className="fs-3 pe-1" />
                        <span className="ps-1">{error}</span>
                      </div>
                      {/* <span type="button" data-bs-dismiss="alert" aria-label="Close"><IoIosClose className="fs-3"/></span> */}
                    </div>
                  )}

                  {/*=================================== Login form alert end =============================== */}

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your Email"
                      value={email}
                      onChange={(evt) => setEmail(evt.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your Passoword"
                      value={password}
                      onChange={(evt) => setPassword(evt.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </form>
                <div className="d-flex justify-content-center mt-1">
                  <p className="h6" style={{ fontSize: "14px" }}>
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="card-link fw-bold text-decoration-none"
                    >
                      Signup
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
