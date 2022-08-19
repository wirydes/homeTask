import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/constants';
import {
  getTopics,
  selectTopicStatus,
  selectErrorMessage,
  selectStagazerCount,
} from './topicsSlice';
import Topics from './topics';
import { apiCallStatus } from '../../utils/constants';

const ReactTopic = () => {
  const dispatch = useAppDispatch();

  const stargazerCount = useAppSelector(selectStagazerCount);
  const status = useAppSelector(selectTopicStatus);
  const error = useAppSelector(selectErrorMessage);

  const updateTopics = (signal) => {
    if (status !== apiCallStatus.loading) {
      dispatch(
        getTopics({
          signal: signal,
        })
      );
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    updateTopics(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  const isLoading = status === 'loading';

  return (
    <>
      {isLoading && <div>loading...</div>}
      {!isLoading && (
        <>
          <h1>React topics</h1>

          <div aria-label='Stargazer Count' style={{ textAlign: 'center' }}>
            Stargazer Count: {stargazerCount}
          </div>
          <Topics />
        </>
      )}
      {!!error && <div aria-live='polite'>{error}</div>}
    </>
  );
};

export default ReactTopic;
