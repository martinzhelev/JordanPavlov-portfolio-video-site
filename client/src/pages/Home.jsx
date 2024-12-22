import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 p-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-6">
        Welcome to Our Business
      </h1>
      <p className="text-lg text-gray-700 mb-6 max-w-xl mx-auto px-4 sm:text-base md:text-lg lg:text-xl">
        We specialize in creating exceptional video content tailored to your
        needs. Let us help you tell your story in the most impactful way.
      </p>
      <img
        src="/assets/hero-image.jpg"
        alt="Hero"
        className="mt-10 rounded-lg shadow-lg w-full max-w-3xl object-cover"
      />
    </div>
  );
};

export default Home;
