import React, { useEffect, useState } from "react";

const About = () => {
  const [aboutData, setAboutData] = useState({ description: "", imageUrl: "", team: [] });

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch((err) => console.error("Error fetching about data:", err));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-5xl font-bold text-white mb-6 text-center">About Us</h1>

      {/* About Description */}
      <p className="text-lg text-gray-300 leading-7 text-center max-w-3xl mb-8">
        {aboutData.description || "Loading description..."}
      </p>

      {/* Team Section */}
     
    </div>
  );
};

export default About;
