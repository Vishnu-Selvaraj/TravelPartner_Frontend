import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import BannerImg from "../../../images/bannerImg2.jpg";
import Banner from "../single_banner/Banner";
import Navbar from "../../Navbar/Navbar";

import ChangePassword from "../../auth/change_password/ChangePassword";
import Profile from "../../User/Profile";
import Footer from "../Landing_pages/footer/Footer";
import { FaCircleUser } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import { MdAirplaneTicket } from "react-icons/md";
import AllBookings from "../../AllBookings/AllBookings";
import toast from "react-hot-toast";
import CheckAuth from "../../auth/ChechAuth/CheckAuth";
import "./userProfile.css";
import LoaderAnimation from "../../LoaderAnimation/LoaderAnimation";

function UserProfile() {
  const { activepage } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize AOS if it has been loaded
    if (window.AOS) {
      window.AOS.init();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2200);
  }, []);

  const handleToast = (message, toastMethod) => {
    if (toastMethod === "success") {
      toast.success(message, {
        style: {
          borderRadius: "10px",
          background: "rgba(255, 255, 255, 0.95)",
          fontWeight: "400",
          color: "#111",
        },
      });
    } else {
      toast.error(message, {
        style: {
          background: "rgba(255, 255, 255, 0.95)",
          fontWeight: "400",
          color: "#111",
        },
      });
    }
  };


  return (
    <div id="userProfileMainDiv">
      <Navbar />

      {isLoading ? (
        <div className="mainDiv row">
          <div className="col-md-2 col-4 mx-auto">
            {/* <div className="loader"></div> */}
            <LoaderAnimation />
          </div>
        </div>
      ) : (
        <>
          <Banner bannerImg={BannerImg} title={"My Profile"} />

          <div className="container mt-3">
            <div className="row">
              <div className="col d-flex justify-content-center flex-wrap">
                <ul
                  className="nav d-flex d-flex-none gap-3 gap-sm-0 flex-wrap"
                  id="userProfileNav"
                >
                  <li
                    className="nav-item subNav-items"
                    // data-aos="zoom-in-down"
                    // data-aos-duration="1500"
                    // data-aos-delay="300"
                  >
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to="/tour-user-profile/accountsettings"
                    >
                      <FaCircleUser className="fs-4" />
                      <span className="ps-1">Account Settings</span>
                    </NavLink>
                  </li>
                  <li
                    className="nav-item subNav-items"
                    // data-aos="zoom-in-down"
                    // data-aos-duration="1500"
                    // data-aos-delay="600"
                  >
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to="/tour-user-profile/changepassword"
                    >
                      <IoMdEye className="fs-4" />
                      <span className="ps-1">Change Password</span>
                    </NavLink>
                  </li>
                  <li
                    className="nav-item subNav-items"
                    // data-aos="zoom-in-down"
                    // data-aos-duration="1500"
                    // data-aos-delay="900"
                  >
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to="/tour-user-profile/mybookings"
                    >
                      <MdAirplaneTicket className="fs-4" />
                      <span className="ps-1">My Bookings</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>

            {activepage === "changepassword" && (
              <ChangePassword handleToast={handleToast} />
            )}
            {activepage === "accountsettings" && (
              <Profile handleToast={handleToast} />
            )}
            {activepage === "mybookings" && <AllBookings />}
          </div>
          <div className="container-fluid mt-5" id="footerBody">
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}

export default CheckAuth(UserProfile);
