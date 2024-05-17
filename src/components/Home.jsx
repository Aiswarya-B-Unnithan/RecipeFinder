import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.jpg'; 
import favoriteImage from '../assets/fav.jpg'; 

const Home = () => {
    return (
      <div className="w-full min-h-screen flex flex-col items-center bg-gray-100">
        <div
          className="w-full h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-4xl font-bold">Recipe Finder</h1>
          </div>
        </div>
        <div className="w-2/3 p-8 bg-white shadow-lg rounded-lg mt-8">
          <h2 className="text-2xl font-bold mb-4">Welcome to Recipe Finder</h2>
          <p className="mb-4">
            Discover thousands of recipes based on the ingredients you have at home. Save your favorite recipes and create delicious meals every day!
          </p>
          <div className="flex flex-col sm:flex-row items-center">
            <img
              src={favoriteImage}
              alt="Favorite Recipes"
              className="w-full sm:w-1/2 h-auto rounded-lg shadow-md mb-4 sm:mb-0 sm:mr-4"
            />
            <div className="flex flex-col items-start">
              <p className="mb-4">
                Browse through our collection of delicious recipes, and don't forget to save your favorites for quick access later!
              </p>
              <Link
                to="/favorites"
                className="mt-4 px-4 py-2 bg-orange text-white rounded hover:bg-orange"
              >
                View Favorite Recipes
              </Link>
              <Link
                to="/search"
                className="mt-4 px-4 py-2 bg-green text-white rounded hover:bg-green"
              >
                Search Recipes
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
export default Home;
