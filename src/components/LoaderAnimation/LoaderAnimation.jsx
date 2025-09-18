import React from "react";
import Lottie from "lottie-react";
import globeAnimation from "./globanimation.json";

function LoaderAnimation() {
  return <Lottie animationData={globeAnimation} />;
}

export default LoaderAnimation;
