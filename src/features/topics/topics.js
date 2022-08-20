import React from 'react';
import SelectedTopic from './selectedTopic';
import { useAppDispatch, useAppSelector } from '../../utils/constants';
import { selectTopicList } from './topicsSlice';
import { handleEnter } from '../../utils/functions';
import { onSelectName } from '../filter/filterSlice';

const Topics = ({ selected, onChangeSelected }) => {
  const dispatch = useAppDispatch();
  const topics = useAppSelector(selectTopicList);

  const onSelect = (name) => {
    dispatch(onSelectName(name));
    onChangeSelected(name);
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
      <td tabIndex={0}>{topic.stargazerCount}</td>
    </tr>
  ));

  return (
    <>
      {!selected && (
        <>
          <h2>Topics</h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <table>
              <thead>
                <tr>
                  <th tabIndex={0}>Name</th>
                  <th tabIndex={0}>StargazerCount</th>
                </tr>
              </thead>
              <tbody>{list}</tbody>
            </table>
          </div>
        </>
      )}
      {selected && <SelectedTopic selected={selected} onSelect={onSelect} />}
    </>
  );
};

export default Topics;
