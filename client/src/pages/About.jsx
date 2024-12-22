import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-5xl font-bold text-blue-600 mb-6 text-center">About Us</h1>
      <p className="text-lg text-gray-700 leading-7 text-center max-w-3xl">
        Our team of creatives works tirelessly to bring your stories to life through the power of video. We ensure every project is unique, impactful, and designed to leave a lasting impression.
      </p>
      <div className="mt-10 text-center">
        <h2 className="text-3xl font-semibold text-blue-500 mb-4">Our Team</h2>
        <ul className="text-lg text-gray-600 space-y-2">
          <li>• Jordan Pavlov - Founder and Creative Director</li>
          <li>• Jane Smith - Lead Videographer</li>
          <li>• John Doe - Editor and Animator</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
