import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  name: '',
  topics: '',
  stargarzer: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    onSelectName: (state, action) => {
      const { payload } = action;
      state.name = payload;
    },
    onUpdateSearch: (state, action) => {
      const { payload } = action;
      if (!state.name) {
        state.name = payload;
        return;
      }
      if (!state.topics) {
        state.topics = payload;
        return;
      }
      if (!state.stargarzer) {
        state.stargarzer = payload;
        return;
      }
    },
    onClearParam: (state, action) => {
      const { payload } = action;
      const empty = '';
      if (payload === 'name') {
        state.name = empty;
        return;
      }
      if (payload === 'topics') {
        state.topics = empty;
        return;
      }
      if (payload === 'stargarzer') {
        state.stargarzer = empty;
        return;
      }
    },
  },
});

export const { onUpdateSearch, onClearParam, onSelectName } =
  filterSlice.actions;

export const selectSearchName = (state) => state.filter.name;
export const selectSearchTopics = (state) => state.filter.topics;
export const selectSearchStargarzer = (state) => state.filter.stargarzer;

export default filterSlice.reducer;
