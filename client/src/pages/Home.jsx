//aspect ratio 9:16

import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-black-0 text-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-6 text-center bg-black">
        {/* <h1 className="text-4xl md:text-6xl font-bold text-white-400 mb-6">
          Welcome to Our Business
        </h1>
        <p className="text-lg text-gray-300 mb-6 max-w-xl mx-auto px-4 sm:text-base md:text-lg lg:text-xl">
         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam earum accusamus suscipit, enim placeat eveniet doloremque
          iste voluptatem dolor consequatur facere. Ipsam, provident. Dolorum deleniti voluptates architecto rem ipsa. Unde?
        </p> */}
       <div className="w-full max-w-full sm:max-w-lg lg:max-w-5xl aspect-[16/9] mt-10 rounded-lg shadow-lg overflow-hidden mx-auto">
  <iframe
    width="100%"
    height="100%"
    src="https://www.youtube.com/embed/GpcaJQ40q1Y?list=PLw1GDxO7G8onYy8ZgVx_QughDa9VGfjMn"
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</div>


      </div>
    </div>
  );
};

export default Home;


