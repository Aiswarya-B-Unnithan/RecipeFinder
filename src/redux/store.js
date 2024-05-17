import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import createFilter from 'redux-persist-transform-filter';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducer from './reducers';

// Save only specific parts of the state
const saveOnlyFilter = createFilter('recipe', ['favorites']);

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['recipe'],
  transforms: [saveOnlyFilter],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
export default store;
