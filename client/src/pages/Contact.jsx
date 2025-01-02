import React from "react";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-5xl font-bold text-white mb-6 text-center">Contact Us</h1>
      <p className="text-lg text-gray-300 text-center max-w-3xl mb-8">
        Reach out to us using the form below or connect through social media.
      </p>
      <form className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full bg-gray-700 border-gray-600 rounded-lg shadow-sm text-white focus:ring focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full bg-gray-700 border-gray-600 rounded-lg shadow-sm text-white focus:ring focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Message
          </label>
          <textarea
            id="message"
            rows="4"
            className="w-full bg-gray-700 border-gray-600 rounded-lg shadow-sm text-white focus:ring focus:ring-blue-500"
            placeholder="Enter your message"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
