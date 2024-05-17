import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRecipes } from '../redux/slices/recipeSlice';

const SearchForm = () => {
  const [ingredients, setIngredients] = useState('');
  const dispatch = useDispatch();
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    console.log("handlesubmit clicked")
    e.preventDefault();
    dispatch(fetchRecipes(ingredients));
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="mb-8">
      <div className="flex">
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients (comma separated)"
          className="p-4 w-full max-w-lg rounded-l-md focus:outline-none text-lg"
          style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }} 
        />
        <button
          type="submit"
          className="bg-orange text-white p-4 rounded-r-md hover:bg-orange-600"
          style={{}} 
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
