import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/constants';
import {
  getTopics,
  selectTopicStatus,
  selectErrorMessage,
  selectStagazerCount,
  selectRepositories,
  selectNumberOfTopics,
  selectInnerTopics,
  setNumberOfTopics,
  setInnerTopics,
} from './topicsSlice';
import Topics from './topics';
import { apiCallStatus } from '../../utils/constants';

const ReactTopic = () => {
  const dispatch = useAppDispatch();

  const stargazerCount = useAppSelector(selectStagazerCount);
  const status = useAppSelector(selectTopicStatus);
  const error = useAppSelector(selectErrorMessage);
  const repositories = useAppSelector(selectRepositories);
  const numberOfTopics = useAppSelector(selectNumberOfTopics);
  const innerTopics = useAppSelector(selectInnerTopics);

  const updateTopics = (signal) => {
    if (status !== apiCallStatus.loading) {
      dispatch(
        getTopics({
          signal: signal,
          relatedTopics: numberOfTopics,
          topicRelated: innerTopics,
          repositories: 3,
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
  }, [numberOfTopics, innerTopics]);

  const isLoading = status === 'loading';
  const numberOption = (prefix) =>
    // up to 10 topics is supported
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
      <option key={`${prefix}-${item}`} value={item}>
        {item}
      </option>
    ));

  const fieldSetStyle = { border: 'none' };
  return (
    <>
      {isLoading && <div>loading...</div>}
      {!isLoading && (
        <>
          <h1>React topics</h1>
          <form>
            <fieldset style={fieldSetStyle}>
              <label>
                Number of topics
                <select
                  defaultValue={numberOfTopics}
                  onChange={(e) => dispatch(setNumberOfTopics(e.target.value))}
                >
                  {numberOption('topic')}
                </select>
              </label>
            </fieldset>
            <fieldset style={fieldSetStyle}>
              <label>
                Number of inner topics
                <select
                  defaultValue={innerTopics}
                  onChange={(e) => dispatch(setInnerTopics(e.target.value))}
                >
                  {numberOption('topic')}
                </select>
              </label>
            </fieldset>
          </form>

          <div aria-label='Stargazer Count' style={{ textAlign: 'center' }}>
            Repositories: {repositories.length}
            <br />
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
