import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

const CameraComponent = () => {
  const navigate = useNavigate();

  const webcamRef = useRef<Webcam>(null);

  const captureImage = async () => {
    const imageSrc = webcamRef.current?.getScreenshot({
      width: 600,
      height: 500,
    });
    console.log("imageSrc: ", imageSrc);

    if (imageSrc) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_ENDPOINT}/future/process-image`,
          { imageSrc },
          {
            withCredentials: true,
          }
        );

        if (response.data.code === 200) {
          console.log("text: ", response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => clearTimeout(timer);
  };

  return (
    <div>
      <Webcam width={400} height={400} audio={false} ref={webcamRef} />
      <button onClick={captureImage}>撮影</button>
    </div>
  );
};

export default CameraComponent;
