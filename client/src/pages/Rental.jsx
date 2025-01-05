import React, { useEffect, useState } from "react";

const Rental = () => {
  const [categories, setCategories] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch rental categories on component mount
  useEffect(() => {
    fetch("http://localhost:5000/api/rental-categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching rental categories:", err));
  }, []);
  const fetchRentals = () => {
    const url = selectedCategory
      ? `http://localhost:5000/api/rentals?category_id=${selectedCategory}`
      : "http://localhost:5000/api/rentals";
  
    console.log("Fetching rentals from:", url);
  
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched rentals:", data);
        setRentals(data);
      })
      .catch((err) => console.error("Error fetching rentals:", err));
  };
  
  // Fetch rentals whenever a category is selected
  useEffect(() => {
    if (selectedCategory) {
      const url = selectedCategory
  ? `http://localhost:5000/api/rentals?category_id=${selectedCategory}&t=${Date.now()}`
  : `http://localhost:5000/api/rentals?t=${Date.now()}`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => setRentals(data))
        .catch((err) => console.error("Error fetching rentals:", err));
    } else {
      setRentals([]); // Clear rentals when no category is selected
    }
  }, [selectedCategory]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-black p-6">
      <h1 className="text-5xl font-bold text-white mb-6 text-center">
        Our Rentals
      </h1>
      <p className="text-lg text-white text-center max-w-3xl mb-8">
        Select a category to explore our offerings!
      </p>

      {/* Categories Ribbon */}
      <div className="flex overflow-x-auto space-x-4 w-full max-w-6xl py-4 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex flex-col items-center space-y-2 p-4 rounded-lg ${
              selectedCategory === category.id
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            <img
              src={category.image_url}
              alt={category.name}
              className="w-16 h-16 object-cover rounded-full"
            />
            <span className="text-sm">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Rentals Grid */}
      {selectedCategory ? (
        rentals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {rentals.map((rental) => (
              <div
                key={rental.id}
                className="bg-gray-800 shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={rental.image_url}
                  alt={rental.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-white">{rental.title}</h2>
                  <p className="text-gray-300">{rental.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 mt-6">No rentals found in this category.</p>
        )
      ) : (
        <p className="text-gray-400 mt-6">Please select a category to view rentals.</p>
      )}
    </div>
  );
};

export default Rental;
