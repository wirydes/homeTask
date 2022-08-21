import React from 'react';
import { useQuery } from '@apollo/client';
import { useAppSelector } from '../../utils/constants';
import { getReactTopic } from './topicsApi';
import {
  //selectSearchName,
  selectSearchStargarzer,
  selectSearchTopics,
} from '../filter/filterSlice';
import P from '../../shared/p';

const SelectedTopic = ({ selected, onSelect }) => {
  const searchStargarzers = useAppSelector(selectSearchStargarzer);
  const searchTopics = useAppSelector(selectSearchTopics);

  const { loading, error, data } = useQuery(getReactTopic(), {
    variables: {
      name: selected,
      stargazers: searchStargarzers === '' ? 10 : Number(searchStargarzers),
      relateds: searchTopics === '' ? 10 : Number(searchTopics),
    },
  });

  console.log(error);

  const topic = data ? data.topic : null;
  const list = () =>
    topic
      ? topic.relatedTopics.map((topic, i) => (
          <tr
            onClick={() => onSelect(topic.name)}
            tabIndex={0}
            key={topic.id}
            id={`topic-${topic.id}`}
          >
            <td tabIndex={0} aria-label={topic.name}>
              {topic.name}
            </td>
            <td tabIndex={0}>{topic.stargazerCount}</td>
          </tr>
        ))
      : [];
  const stargazers = () =>
    topic
      ? topic.stargazers.edges.map((stargazer, i) => (
          <tr
            tabIndex={0}
            key={stargazer.node.id}
            id={`topic-${stargazer.node.id}`}
          >
            <td tabIndex={0} aria-label={stargazer.node.name}>
              {stargazer.node.name}
            </td>
            <td tabIndex={0} aria-label={stargazer.node.email}>
              {stargazer.node.email}
            </td>
            <td tabIndex={0}>
              <img
                width={50}
                height={50}
                src={stargazer.node.avatarUrl}
                alt={stargazer.node.name}
              />
            </td>
          </tr>
        ))
      : [];
  return (
    <div id='selected-topic' data-testid='selected-topic'>
      <h2 className='h2'>Selected Topic</h2>
      <button className='btn btn-primary' onClick={() => onSelect('')}>
        Back
      </button>
      {loading && <P>Loading...</P>}
      {error && <P>Error: {error.message}</P>}
      {!loading && !error && topic && (
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
              <table
                className='table table-striped table-hover'
                id='related-topics-table'
              >
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
              <table
                className='table table-striped table-hover'
                id='stargarzers-table'
              >
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
    </div>
  );
};

export default SelectedTopic;
