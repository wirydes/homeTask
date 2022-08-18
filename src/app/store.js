import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import topicsReducer from '../features/topics/topicsSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  topics: topicsReducer,
});
export const setUpStore = (preloadedState) =>
  configureStore({ reducer: rootReducer, preloadedState });
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    topics: topicsReducer,
  },
});
