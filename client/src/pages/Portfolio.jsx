import React, { useEffect, useState } from "react";

const Portfolio = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.error("Error fetching videos:", err));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-5xl font-bold text-blue-600 mb-6 text-center">Our Portfolio</h1>
      <p className="text-lg text-gray-700 text-center max-w-3xl mb-8">
        Browse through some of our amazing projects.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {videos.map((video) => (
          <div key={video.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
            <h2 className="text-xl font-bold text-blue-500 mb-4">{video.title}</h2>
            <video
              controls
              className="rounded-lg shadow-md w-full"
              src={video.url}
              alt={`Video for ${video.title}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
