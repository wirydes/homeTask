import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  search: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    onUpdateSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { onUpdateSearch } = filterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectSearch = (state) => state.filter.search;

export default filterSlice.reducer;
