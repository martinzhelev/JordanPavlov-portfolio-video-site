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
      <div className="mt-10 text-center">
        <h2 className="text-3xl font-semibold text-white mb-4">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aboutData.team.map((member) => (
            <div key={member.name} className="text-center">
              {/* Team Member Picture */}
              <img
                src={member.image_url}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              {/* Team Member Name and Position */}
              <h3 className="text-xl font-semibold text-white">{member.name}</h3>
              <p className="text-lg text-gray-300">{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
