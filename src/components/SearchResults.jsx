import React, { useState, useEffect, Suspense } from 'react';
import { useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader'; 
import { dummyRecipes } from '../assets/data/dummy';
import { useNavigate } from 'react-router-dom';

// Import RecipeDetails component
const RecipeDetails = React.lazy(() => import('./ReceipeDetails'));

const ITEMS_PER_PAGE = 9; // Number of recipes per page

const SearchResults = () => {
  const { recipes, loading, error } = useSelector((state) => state.recipe);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedRecipe(null);
  }, [recipes]);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    navigate(`/recipe/${recipe.id}`, { state: { recipe } });
  };

  // Pagination logic
  const indexOfLastRecipe = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstRecipe = indexOfLastRecipe - ITEMS_PER_PAGE;
  const currentRecipes = recipes?.length > 0 ? recipes.slice(indexOfFirstRecipe, indexOfLastRecipe) : dummyRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    <div className="w-3/3 p-4">
      {selectedRecipe ? (
        <Suspense fallback={<div>Loading recipe details...</div>}> 
          <RecipeDetails recipe={selectedRecipe} />
        </Suspense>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Your Search Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentRecipes?.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
                onClick={() => handleRecipeClick(recipe)}
              >
                <h3 className="text-xl font-semibold mb-4">{recipe.title}</h3>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-56 object-cover rounded"
                />
                <p className="mt-4">{recipe.readyInMinutes} minutes</p>
                <p className="mt-2">{recipe.servings} servings</p>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil((recipes?.length || dummyRecipes.length) / ITEMS_PER_PAGE) }).map((_, index) => (
              <button key={index} onClick={() => paginate(index + 1)} className="mx-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;
