import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/constants';
import { useParams, Link } from 'react-router-dom';
import { getTopic, onSelectTopic } from './topicsSlice';

const SelectedTopic = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const topic = useAppSelector((state) => state.topics.selectedTopic);
  const updateTopic = (signal) => {
    if (topic === null) {
      dispatch(
        getTopic({
          signal: signal,
          name: id,
        })
      );
    }
  };

  useEffect(() => {
    return () => {
      dispatch(onSelectTopic({ topic: null }));
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    updateTopic(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  const list = () =>
    topic
      ? topic.relatedTopics.map((topic, i) => (
          <tr tabIndex={0} key={topic.id} id={`topic-${topic.id}`}>
            <td tabIndex={0} aria-label={topic.name}>
              {topic.name}
            </td>
            <td tabIndex={0}>{topic.stargazerCount}</td>
          </tr>
        ))
      : [];
  const stargazers = () =>
    topic
      ? topic.stargazers.map((stargazer, i) => (
          <tr tabIndex={0} key={stargazer.id} id={`topic-${stargazer.id}`}>
            <td tabIndex={0} aria-label={stargazer.name}>
              {stargazer.name}
            </td>
            <td tabIndex={0} aria-label={stargazer.email}>
              {topic.email}
            </td>
            <td tabIndex={0}>
              <img
                width={50}
                height={50}
                src={stargazer.avatarUrl}
                alt={stargazer.name}
              />
            </td>
          </tr>
        ))
      : [];
  return (
    <>
      <h1>Selected Topic</h1>
      <Link to='/'>Back home</Link>
      {topic === undefined && <div>Loading...</div>}
      {!!topic && (
        <div style={{ textAlign: 'center' }}>
          Topic: {topic.name}
          <br />
          Stargazer Count: {topic.stargazerCount}
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <h2>Related topics</h2>
            <h2>Stargazers</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <table id='related-topics-table'>
                <thead>
                  <tr>
                    <th tabIndex={0}>Name</th>
                    <th tabIndex={0}>StargazerCount</th>
                  </tr>
                </thead>
                <tbody>{list()}</tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <table id='stargarzers-table'>
                <thead>
                  <tr>
                    <th tabIndex={0}>Name</th>
                    <th tabIndex={0}>Email</th>
                    <th tabIndex={0}>Avatar</th>
                  </tr>
                </thead>
                <tbody id='stargarzers-body'>{stargazers()}</tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedTopic;
