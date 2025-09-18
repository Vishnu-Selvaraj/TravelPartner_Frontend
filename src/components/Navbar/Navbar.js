import React, { useEffect, useState } from "react";
import logo from "../../images/airplane.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Search from "../search/Search";
import axios from "axios";
import "./navbar.css";
import Modal from "../Modal/Modal";
import { Axios } from "../../axiosInstance/AxiosInstance";

const Navbar = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("userToken"));

  const handleLogout = async () => {
    if (token) {
      var options = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      try {
        const response = await Axios.post("logout", {}, options);
        // console.log(response.data.message);

        {
          /* =============================================== In below removing the backdrop-effect by modal after click on book button ===================================================  */
        }

        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
          backdrop.remove(); // Remove the backdrop manually
        }
        localStorage.removeItem("userToken");
        localStorage.setItem("userToken", JSON.stringify(null));
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Unauthorized access");
    }
  };

  return (
    <div id="navbarBg">
      <nav className="navbar navbar-expand-lg navbar-light pe-4" id="navbar">
        <div className="container-fluid">
          <NavLink className="navbar-brand ms-5 fw-bold" to={"/"}>
            <img src={logo} id="imgLogo" alt="" />
            TRAVEL PARTNER
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon fs-6"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to={"/"}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to={"tourList"}
                >
                  Tours
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to={"/tour-user-profile/accountsettings"}
                >
                  My Profile
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ">
              {token ? (
                <li className="nav-item">
                  <Link
                    to={"/"}
                    className="nav-link"
                    data-bs-toggle="modal"
                    data-bs-target="#LogoutModal"
                  >
                    logout
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to={"/login"}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      id="signup"
                      to={"/signup"}
                    >
                      Signup
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Modal
        modalId="LogoutModal"
        message="Are you sure you want to logout?"
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default Navbar;
