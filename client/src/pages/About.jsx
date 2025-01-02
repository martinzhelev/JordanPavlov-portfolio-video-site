import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-5xl font-bold text-white mb-6 text-center">About Us</h1>
      <p className="text-lg text-gray-300 leading-7 text-center max-w-3xl mb-8">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio ex dolores nulla quam minus id explicabo animi minima voluptatibus esse officiis impedit, asperiores laudantium unde? Quo vero qui distinctio repudiandae!
      </p>
      <div className="mt-10 text-center">
        <h2 className="text-3xl font-semibold text-white mb-4">Our Team</h2>
        <ul className="text-lg text-gray-300 space-y-2">
          <li>• Jordan Pavlov - Founder and Creative Director</li>
         
        </ul>
      </div>
    </div>
  );
};

export default About;
