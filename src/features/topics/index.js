import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/constants';
import {
  getTopics,
  selectTopicStatus,
  selectErrorMessage,
  selectStagazerCount,
} from './topicsSlice';
import {
  selectSearchName,
  selectSearchStargarzer,
  selectSearchTopics,
} from '../filter/filterSlice';
import Topics from './topics';
import { apiCallStatus } from '../../utils/constants';

const ReactTopic = () => {
  const dispatch = useAppDispatch();

  const [selected, setSelected] = useState('');
  const stargazerCount = useAppSelector(selectStagazerCount);
  const status = useAppSelector(selectTopicStatus);
  const error = useAppSelector(selectErrorMessage);
  const searchName = useAppSelector(selectSearchName);
  const searchStargarzers = useAppSelector(selectSearchStargarzer);
  const searchTopics = useAppSelector(selectSearchTopics);

  const updateTopics = useCallback(
    (signal) => {
      if (status !== apiCallStatus.loading) {
        dispatch(
          getTopics({
            signal: signal,
            customQuery: {
              name: searchName,
              stargarzers: searchStargarzers,
              topics: searchTopics,
            },
          })
        );
      }
    },
    [searchName, searchStargarzers, searchTopics]
  );

  useEffect(() => {
    const controller = new AbortController();

    updateTopics(controller.signal);
    return () => {
      controller.abort();
    };
  }, [updateTopics]);

  const isLoading = status === 'loading';
  const getTitle = () => {
    return searchName ? searchName : 'React';
  };
  const title = getTitle();
  return (
    <>
      {isLoading && <div>loading...</div>}
      {!isLoading && (
        <>
          <h1>{title} topics</h1>

          <div aria-label='Stargazer Count' style={{ textAlign: 'center' }}>
            Stargazer Count: {stargazerCount}
          </div>
          <Topics selected={selected} onChangeSelected={setSelected} />
        </>
      )}
      {!!error && <div aria-live='polite'>{error}</div>}
    </>
  );
};

export default ReactTopic;
