import React from "react";
import logo from "../../../../images/airplane.png";
import FooterImg2 from "../../../../images/footerImg2.png";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {

  const token = JSON.parse(localStorage.getItem('userToken'))

  return (
    <div>
      <div className="row">
        <div className="col-12 col-lg-4 d-flex justify-content-center align-items-center">
          {/* ===================== col divided into 3 inner cols COL1 ==================== */}
          <div className="row">
            <div className="col-12 d-flex justify-content-center align-items-center">
              <h5 className="fw-bold mt-5 ">
                <img src={logo} id="footerimgLogo" alt="logo" />
                TRAVEL PARTNER
              </h5>
            </div>
          {/* ============================== COL2 ========================================== */}
            <div className="col-12">
              <div className="d-flex justify-content-center align-items-center gap-4 fs-5 mt-3">
                <FaInstagramSquare className="footer-icons text-danger" />
                <FaFacebookSquare className="footer-icons text-primary" />
                <BsTwitterX className="footer-icons  text-dark" />
                <FaLinkedin className="footer-icons text-primary" />
              </div>
            </div>
          </div>
        </div>
        {/* ============================== COL3 ========================================== */}

        <div className="col-12 col-lg-4 d-flex justify-content-center align-items-center">
              <div className="d-flex justify-content-center align-items-center gap-4 fw-bold mt-3">
                <Link to={'/'} className="text-dark text-decoration-none footer-nav " >Home</Link>
                {
                  token ? (
                    <>
                    <Link to={'tourList'} className="text-dark text-decoration-none footer-nav " >Tours</Link>
                    <Link to={'/tour-user-profile/accountsettings'} className="text-dark text-decoration-none footer-nav" >My Profile</Link>
                    </>
                  ):(
                    <>
                    <Link to={'/login'} className="text-dark text-decoration-none footer-nav " >Login</Link>
                    <Link to={'/signup'} className="text-dark text-decoration-none footer-nav " >Signup</Link>
                    </>
                  )
                }
              </div>
            </div>
        {/* ============ Main col 2 ============== */}
        <div className="col-12 col-lg-4 ">
          <img
            className="d-none d-lg-block"
            src={FooterImg2}
            alt="footerImg"
            id="footer-img"
            
          />
        </div>
      </div>

      <div className="row">
        <div className="col mt-4 mt-lg-0">
          <p className="text-center" style={{fontSize:'small', opacity:'0.85'}}>
            Copyright &#169; 2024, All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
