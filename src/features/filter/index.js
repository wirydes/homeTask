import React, { useState } from 'react';
import {
  onUpdateSearch,
  selectSearchName,
  selectSearchStargarzer,
  selectSearchTopics,
  onClearParam,
} from './filterSlice';
import { useAppDispatch, useAppSelector } from '../../utils/constants';
import Input from '../../shared/input';
import P from '../../shared/p';
import { handleComma, handleEnter } from '../../utils/functions';
import Div from '../../shared/div';
const Search = () => {
  const dispatch = useAppDispatch();
  const name = useAppSelector(selectSearchName);
  const stargarzer = useAppSelector(selectSearchStargarzer);
  const topics = useAppSelector(selectSearchTopics);
  const [text, setText] = useState('');
  const info =
    'search rules: \n-params order: [\n \t"topic name",\n \t "number of related topics",\n \t "number of stargazers"\n].\n-set params using "," or "enter".';
  const onChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const pStyle = {
    border: '1px solid',
    borderRadius: '5%',
    cursor: 'pointer',
    marginRight: '5px',
  };
  const onSuccess = (e, value) => {
    e.preventDefault();
    setText('');
    dispatch(onUpdateSearch(value));
  };

  const handleKeyDown = (e) => {
    handleEnter(e, () => onSuccess(e, text));
    handleComma(e, () => onSuccess(e, text));
  };
  return (
    <>
      <Div isFlex>
        {name ? (
          <P onClick={() => dispatch(onClearParam('name'))} style={pStyle}>
            Name: {name}
          </P>
        ) : null}
        {topics ? (
          <P onClick={() => dispatch(onClearParam('topics'))} style={pStyle}>
            topics: {topics}
          </P>
        ) : null}
        {stargarzer ? (
          <P
            onClick={() => dispatch(onClearParam('stargarzer'))}
            style={pStyle}
          >
            stargarzer: {stargarzer}
          </P>
        ) : null}
      </Div>
      <Input
        id='searchQuery'
        label='Search: '
        value={text}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        info={info}
      />
    </>
  );
};

export default Search;
