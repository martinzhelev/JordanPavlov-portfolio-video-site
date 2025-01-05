import React, { useState, useEffect } from "react";

const Home = () => {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    // Fetch the video data from the backend
    fetch("http://localhost:5000/api/home-video")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.url) {
          setVideoUrl(data.url);
        } else {
          console.error("No video URL found in the response.");
        }
      })
      .catch((error) => {
        console.error("Error fetching video URL:", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center min-h-screen w-full p-6 text-center bg-black">
        <div className="w-full max-w-full sm:max-w-lg lg:max-w-5xl aspect-[16/9] mt-20 rounded-lg shadow-lg overflow-hidden mx-auto">
          {videoUrl ? (
            <iframe
              width="100%"
              height="100%"
              src={videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p className="text-gray-300">Loading video...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
