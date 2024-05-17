import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites } from '../redux/slices/recipeSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const RecipeDetails = () => {
  const { state: { recipe } } = useLocation();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.recipe.favorites);
  const { loading, error } = useSelector((state) => state.recipe);
  // Check if the recipe is already in favorites
  const isFavorite = favorites.some((fav) => fav.id === recipe.id);

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(recipe));
    toast.success("Recipe added as favorite!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  if (loading) return (
    <div className="flex justify-center items-center h-full">
      <ClipLoader size={50} color={"#F89223"} loading={loading} />
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-full">
      <p className="text-danger">{error}</p>
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <Link to="/search" className="mr-2 text-gray-600 hover:text-gray-900">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
        <h2 className="text-2xl font-bold">{recipe?.title}</h2>
      </div>
      <img
        src={recipe?.image}
        alt={recipe?.title}
        className="w-45 h-45 object-cover rounded"
      />
      <p className="mt-2">{recipe?.readyInMinutes} minutes</p>
      <p className="mt-2">{recipe?.servings} servings</p>
      <button
        onClick={handleAddToFavorites}
        disabled={isFavorite} 
        className={`mt-4 px-4 py-2 bg-orange text-white rounded ${isFavorite ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
      </button>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Ingredients</h3>
        <ul className="list-disc pl-5">
          {recipe?.extendedIngredients?.map((ingredient, index) => (
            <li key={index}>{ingredient.name}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Instructions</h3>
        <p>{recipe?.instructions}</p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RecipeDetails;
