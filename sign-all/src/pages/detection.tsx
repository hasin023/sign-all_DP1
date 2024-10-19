import Navbar from "@/components/common/Navbar";
import React, { useRef, useState, useEffect } from "react";

const SignDetection = () => {
  const videoRef1 = useRef(null);  // First camera
  const videoRef2 = useRef(null);  // Second camera
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Start the first camera immediately when the component mounts
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        let video1 = videoRef1.current;
        if (video1) {
          video1.srcObject = stream;
          video1.play();
        }
      })
      .catch((err) => {
        console.error("Error accessing the first camera: ", err);
      });
  }, []);

  // Function to start both cameras when the button is clicked
  const startCamera = () => {
    console.log("Attempting to access the camera...");
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        console.log("Camera accessed successfully!");

        let video1 = videoRef1.current;
        if (video1) {
          video1.srcObject = stream;
          video1.play();
          console.log("First video stream started.");
        }

        let video2 = videoRef2.current;
        if (video2) {
          video2.srcObject = stream;
          video2.play();
          console.log("Second video stream started.");
        }

        setIsCameraActive(true);
      })
      .catch((err) => {
        console.error("Error accessing the camera: ", err);
      });
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-4">
            Realtime ASL (American Sign Language) Detection
          </h1>
          <p className="text-lg">
            Detect signs from camera feed in realtime. Use our tailored AI to
            recognize sign language gestures and convert them into text.
          </p>
        </div>

        {/* Two video containers appear side by side after button click */}
        <div className="flex space-x-4">
          {/* First camera feed always visible */}
          <div className="bg-black w-11/12 md:w-3/4 lg:w-1/2 h-64 rounded-lg shadow-lg relative">
            <video
              ref={videoRef1}
              className="w-full h-full object-cover rounded-lg"
              autoPlay
              playsInline
            ></video>

            {!isCameraActive && (
              <div className="absolute inset-0 flex justify-center items-center">
                <button
                  onClick={startCamera}
                  className="bg-blue-500 p-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    stroke="white"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.5-4.5M19.5 5.5L15 10M19 11v10a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h7M7 15h7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Second camera feed - hidden until the camera is active */}
          {isCameraActive && (
            <div className="bg-black w-11/12 md:w-3/4 lg:w-1/2 h-64 rounded-lg shadow-lg relative">
              <video
                ref={videoRef2}
                className="w-full h-full object-cover rounded-lg"
                autoPlay
                playsInline
              ></video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignDetection;
