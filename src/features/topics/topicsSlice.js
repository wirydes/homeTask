import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getReactTopics, getReactTopic } from './topicsApi';
import { apiCallStatus } from '../../utils/constants';

export const initialState = {
  relatedTopics: [],
  stargazerCount: 0,
  status: apiCallStatus.idle,
  errorMessage: '',
  selectedTopic: null,
};

// The function below is called a thunk and allows us to perform async logic.
export const getTopics = createAsyncThunk(
  'topics/fetch',
  async ({ signal, customQuery = '' }) => {
    const { data, error } = await getReactTopics(signal, customQuery);
    // The value we return becomes the `fulfilled` action payload

    const isError = !!error;
    return isError ? { isError, error } : { isError, topic: data.topic };
  }
);
export const getTopic = createAsyncThunk(
  'topic/fetch',
  async ({ signal, name, customQuery = '' }) => {
    const { data, error } = await getReactTopic(signal, name, customQuery);
    const isError = !!error;
    return isError ? { isError, error } : { isError, topic: data.topic };
  }
);

export const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    onSelectTopic: (state, action) => {
      state.selectedTopic = action.payload.topic;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getTopics.pending, (state) => {
        state.status = apiCallStatus.loading;
      })
      .addCase(getTopics.fulfilled, (state, action) => {
        state.status = apiCallStatus.idle;
        if (action.payload.isError) {
          state.errorMessage = action.payload.error;
        } else {
          const { topic } = { ...action.payload };
          state.errorMessage = '';
          state.stargazerCount = topic.stargazerCount;
          state.relatedTopics = [
            ...topic.relatedTopics.map((item) => ({
              ...item,
              stargazers: item.stargazers.nodes.map((inner) => inner),
            })),
          ];
        }
      })
      .addCase(getTopics.rejected, (state, action) => {
        state.status = apiCallStatus.idle;
        state.errorMessage = action.error.message;
      })
      .addCase(getTopic.pending, (state) => {
        state.status = apiCallStatus.loading;
      })
      .addCase(getTopic.fulfilled, (state, action) => {
        state.status = apiCallStatus.idle;
        if (action.payload.isError) {
          state.errorMessage = action.payload.error;
        } else {
          const { topic } = { ...action.payload };
          state.selectedTopic = {
            ...topic,
            stargazers: topic.stargazers.edges.map((item) => item.node),
          };
          state.errorMessage = '';
        }
      })
      .addCase(getTopic.rejected, (state, action) => {
        state.status = apiCallStatus.idle;
        state.errorMessage = action.error.message;
      });
  },
});

export const { onSelectTopic } = topicsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTopicList = (state) => state.topics.relatedTopics;
export const selectStagazerCount = (state) => state.topics.stargazerCount;
export const selectTopicStatus = (state) => state.topics.status;
export const selectErrorMessage = (state) => state.topics.errorMessage;
export const selectedTopic = (state) => state.topics.selectedTopic || null;

export default topicsSlice.reducer;
