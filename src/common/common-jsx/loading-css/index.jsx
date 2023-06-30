import React from "react";
import "./index.css";

const LoadingCss = () => {
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center"
      style={{
        width: "80vw",
        height: "100vh",
        // backgroundColor: "rgba(0,0,0,.1)",
      }}
    >
      <h1>Loading</h1>
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default LoadingCss;
