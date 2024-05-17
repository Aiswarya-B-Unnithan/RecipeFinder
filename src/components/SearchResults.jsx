import React, { useState, useEffect, Suspense } from 'react'; // Import Suspense
import { useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader'; 
import { dummyRecipes } from '../assets/data/dummy';
import { useNavigate } from 'react-router-dom';

// Import RecipeDetails component
const RecipeDetails = React.lazy(() => import('./ReceipeDetails'));

const SearchResults = () => {
  const { recipes, loading, error } = useSelector((state) => state.recipe);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();
console.log(recipes)
  useEffect(() => {
    setSelectedRecipe(null);
  }, [recipes]);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    navigate(`/recipe/${recipe.id}`, { state: { recipe } });
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
    <div className="w-3/3 p-4">
      {selectedRecipe ? (
        <Suspense fallback={<div>Loading recipe details...</div>}> 
          <RecipeDetails recipe={selectedRecipe} />
        </Suspense>
      ) : (
        recipes?.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Your Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipes?.map((recipe) => (
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
          </>
        ) : (
          <>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dummyRecipes?.map((recipe) => (
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
          </>
        )
      )}
    </div>
  );
};

export default SearchResults;
