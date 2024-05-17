import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY
const API_URL = 'https://api.spoonacular.com/recipes/complexSearch';

const initialState = {
  recipes: [],
  favorites: [],
  loading: false,
  error: null,
};

// Async actions
export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (ingredients, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          apiKey: API_KEY,
          includeIngredients: ingredients,
          instructionsRequired: true,
        },
      });
      if (response.data.results.length === 0) {
        throw new Error('No recipes found');
      }
      const recipeIds = response.data.results.map((result) => result.id);
      const recipesDetailsPromises = recipeIds.map((id) => fetchRecipeDetails(id));

      const recipesDetails = await Promise.all(recipesDetailsPromises);
      
      return recipesDetails;
    }  catch (error) {
      let errorMessage;
      if (!error.response) {
        // Network error
        errorMessage = 'Network error, please try again later';
      } else if (error.response.status === 401) {
        // Unauthorized error
        errorMessage = 'Invalid API key';
      } else {
        // Other errors
        errorMessage = error.message || 'Something went wrong, please try again later';
      }
      return rejectWithValue(errorMessage);
    }
  }
);

const fetchRecipeDetails = async (recipeId) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
      params: {
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};


const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (recipe) => recipe.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addToFavorites, removeFromFavorites } = recipeSlice.actions;
export default recipeSlice.reducer;
