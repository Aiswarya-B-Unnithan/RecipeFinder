import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../redux/slices/recipeSlice';
import noFavoritesImage from '../assets/sad-cartoon-vector-chef_G1e7q1OO_SB_PM.jpg';
import logo from '../assets/logo.jpg'; // Import your logo image here
import { Link, useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 9; // Number of favorite recipes per page

const FavoriteRecipes = () => {
  const { favorites } = useSelector((state) => state.recipe);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const handleRemoveFavorite = (recipeId) => {
    dispatch(removeFromFavorites(recipeId));
  };

  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${recipe.id}`, { state: { recipe } });
  };

  // Pagination logic
  const indexOfLastRecipe = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstRecipe = indexOfLastRecipe - ITEMS_PER_PAGE;
  const currentRecipes = favorites.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="h-full w-50 flex justify-center items-center">
      <div className="w-full lg:w-2/3 px-4 py-8 flex flex-col justify-center items-center mt-16">
        <div className="absolute top-0 left-0 p-4">
          <Link to='/'><img src={logo} alt="Logo" className="h-9" /></Link>
        </div>
        {favorites.length !== 0 ? <h1 className="text-2xl font-bold mb-4">Favorite Recipes</h1> : ""}
        {favorites.length === 0 ? (
          <div className="flex flex-col justify-center items-center">
            <img src={noFavoritesImage} alt="No Favorites" className="mb-4" />
            <p className="text-gray-600 text-center">No favorite recipes found. Please add some favorites!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="w-full bg-white rounded-lg shadow-md mb-4 cursor-pointer"
                  onClick={() => handleRecipeClick(recipe)}
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); 
                        handleRemoveFavorite(recipe.id);
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 ease-in-out"
                    >
                      Remove from Favorites
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-4">
              {Array.from({ length: Math.ceil(favorites.length / ITEMS_PER_PAGE) }).map((_, index) => (
                <button key={index} onClick={() => paginate(index + 1)} className="mx-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FavoriteRecipes;
