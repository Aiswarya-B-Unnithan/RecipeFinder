import axios from 'axios';

const API_KEY = '82278e8d9eb24daaa3ae01e041532030';
const API_URL = 'https://api.spoonacular.com/recipes/complexSearch';

export const fetchRecipes = async (ingredients) => {
  const response = await axios.get(API_URL, {
    params: {
      apiKey: API_KEY,
      includeIngredients: ingredients,
      instructionsRequired:true
      
    },
  });
  return response.data.results;
};
