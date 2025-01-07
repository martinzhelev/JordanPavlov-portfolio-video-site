import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // To navigate if needed

const Rental = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/rentals-page")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching rentals data:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <h3>Loading...</h3>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-black text-white p-6">
            <h1 className="text-5xl font-bold text-white mb-6 text-center">Rentals</h1>
            <p className="text-lg text-gray-300 text-center max-w-3xl mb-8">
                Explore various rental categories.
            </p>
            
            {/* Category Ribbon */}
            <div className="w-full flex overflow-x-auto space-x-4 mb-8">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        className={`px-6 py-2 text-lg font-semibold rounded-md focus:outline-none ${
                            selectedCategory === category.id
                                ? "bg-blue-600 text-white"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                        onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Category Items */}
            {selectedCategory && (
                <div className="w-full max-w-6xl">
                    {categories
                        .filter((category) => category.id === selectedCategory)
                        .map((category) => (
                            <div key={category.id}>
                                <h2 className="text-2xl font-bold text-white mb-4">{category.name}</h2>
                                <p className="text-sm text-gray-400 mb-6">{category.description}</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {category.rentals.map((rental) => (
                                        <div
                                            key={rental.id}
                                            className="rental-card relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition duration-300 hover:scale-105"
                                        >
                                            <img
                                                src={rental.image_url}
                                                alt={rental.title}
                                                className="w-full h-56 object-cover rounded-t-lg"
                                            />
                                            <div className="rental-details absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
                                                <h3 className="text-xl font-semibold">{rental.title}</h3>
                                                <p className="text-sm opacity-80">{rental.description}</p>
                                                <Link
                                                    to={`/rentals/${rental.id}`}
                                                    className="text-white font-bold text-sm mt-2 underline"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Rental;
