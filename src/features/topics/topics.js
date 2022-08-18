import React from 'react';
import { useAppSelector } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { selectTopicList } from './topicsSlice';
import { handleEnter } from '../../utils/functions';

const Topics = () => {
  const topics = useAppSelector(selectTopicList);
  const navigate = useNavigate();
  const onSelect = (name) => {
    navigate(`/topic/${name}`, { replace: false });
  };

  const list = topics.map((topic) => (
    <tr
      onClick={() => onSelect(topic.name)}
      onKeyDown={(e) => handleEnter(e, () => onSelect(topic.name))}
      tabIndex={0}
      key={topic.id}
      id={`topic-${topic.id}`}
    >
      <td tabIndex={0} aria-label={topic.name}>
        {topic.name}
      </td>
      <td tabIndex={0}>{topic.relatedTopics.length}</td>
      <td tabIndex={0}>{topic.stargazerCount}</td>
    </tr>
  ));

  return (
    <>
      <h2>Topics</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <table>
          <thead>
            <tr>
              <th tabIndex={0}>Name</th>
              <th tabIndex={0}>Inner topics</th>
              <th tabIndex={0}>StargazerCount</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
      </div>
    </>
  );
};

export default Topics;
