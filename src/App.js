import React, { useEffect, useState } from "react";
import ServiceSection from "./components/pages/Landing_pages/service_section1/ServiceSection";
import ServiceSectionTwo from "./components/pages/Landing_pages/service_section2/ServiceSectionTwo";
import Footer from "./components/pages/Landing_pages/footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Card from "./components/card/Card";
import "./App.css";
import Carousel from "./components/Carousel/Carousel";
import { Axios } from "./axiosInstance/AxiosInstance";

export function App() {
  const [data, setData] = useState([]);

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async () => {
    try {
      const response = await Axios.get("get-homepage-tour-data");
      console.log(response, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
      setData(response.data.data);

    } catch (error) {
      console.log(error);
    }
  }

    return (
      <div className="App">
        <Navbar />
        {/* <Search/> */}
        {/* ======================================= Carousel component ========================================= */}
        <Carousel data={data} />
        {/* ======================================= Card component ========================================= */}
        <div className="container">
          <div className="row">
            <div className="col mt-4 text-center">
              <h1 className=" display-4  fw-bold" id="first-heading">
                Our Featured Tours
              </h1>
            </div>
          </div>
          <Card TourData={data.slice(0, 4)} />
        </div>
        {/* ======================================= service section start========================================= */}
        <div className="container-fluid mt-5">
          <ServiceSection />
        </div>
        {/* ======================================= service section end ========================================= */}

        {/* ======================================= service section2 start ========================================= */}

        <div className="container mt-5">
          <div className="row">
            <div className="col">
              <h5
                className="text-center display-5 fw-bold"
                data-aos="zoom-in-right"
                data-aos-duration="3000"
              >
                Why book with us?
              </h5>
            </div>
          </div>
          <ServiceSectionTwo />
        </div>
        {/* ======================================= service section2 end ========================================= */}

        {/* ======================================= footer start ========================================= */}

        <div className="container-fluid mt-5" id="footerBody">
          <Footer />
        </div>

        {/* ======================================= footer end ========================================= */}
      </div>
    );
}

export default App;
