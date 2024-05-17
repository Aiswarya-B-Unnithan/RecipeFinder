import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../redux/slices/recipeSlice';
import noFavoritesImage from '../assets/sad-cartoon-vector-chef_G1e7q1OO_SB_PM.jpg';
import logo from '../assets/logo.jpg'; // Import your logo image here
import { Link, useNavigate } from 'react-router-dom';

const FavoriteRecipes = () => {
  const { favorites } = useSelector((state) => state.recipe);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFavorite = (recipeId) => {
    dispatch(removeFromFavorites(recipeId));
  };

  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${recipe.id}`, { state: { recipe } });
  };

  return (
    <div className="h-full w-50 flex justify-center items-center">
      <div className="w-full lg:w-1/3 px-4 py-8 flex flex-col justify-center items-center">
        <div className="absolute top-0 left-0 p-4">
          <Link to='/'><img src={logo} alt="Logo" className="h-9" /></Link>
        </div>
        {favorites.length !== 0 ? <h2 className="text-2xl font-bold mb-4">Favorite Recipes</h2> : ""}
        {favorites.length === 0 ? (
          <div className="flex flex-col justify-center items-center">
            <img src={noFavoritesImage} alt="No Favorites" className="mb-4" />
            <p className="text-gray-600 text-center">No favorite recipes found. Please add some favorites!</p>
          </div>
        ) : (
          favorites.map((recipe) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default FavoriteRecipes;
