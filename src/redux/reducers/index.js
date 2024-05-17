import { combineReducers } from '@reduxjs/toolkit';
import recipeReducer from '../slices/recipeSlice';

const rootReducer = combineReducers({
  recipe: recipeReducer,
});

export default rootReducer;
