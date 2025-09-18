import React from "react";
import "../tours_List_page/TourList.css";

function Banner(props) {

    console.log(props.bannerImg)
  return (
    <div className="row">
      <div className="col bannerImg d-flex justify-content-center align-items-center" style={{background: `rgba(0, 0, 0, 0.12) url("${props.bannerImg}") no-repeat center center/cover`, width:'100vw'}}>
        <h5 className="display-4 fw-bold ps-3 text-white Listheading">
          {props.title}
        </h5>
      </div>
    </div>
  );
}

export default Banner;
