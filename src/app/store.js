import { configureStore, combineReducers } from '@reduxjs/toolkit';
import topicsReducer from '../features/topics/topicsSlice';
import filterReducer from '../features/filter/filterSlice';
const rootReducer = combineReducers({
  topics: topicsReducer,
  filter: filterReducer,
});
export const setUpStore = (preloadedState) =>
  configureStore({ reducer: rootReducer, preloadedState });

export const store = setUpStore({});
