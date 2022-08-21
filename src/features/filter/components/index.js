import React, { useEffect, useState } from 'react';
import {
  onUpdateSearch,
  selectSearchName,
  selectSearchStargarzer,
  selectSearchTopics,
  onClearParam,
  onUpdateQuery,
  reset,
} from '../redux/filterSlice';
import { resetCustom } from '../../topics/redux/topicsSlice';
import { useAppDispatch, useAppSelector } from '../../../utils/constants';
import Input from '../../../shared/input';
import TextArea from '../../../shared/textarea';
import { handleComma, handleEnter } from '../../../utils/functions';
import Div from '../../../shared/div';
import Chip from '../../../shared/chip';

const Search = () => {
  const dispatch = useAppDispatch();
  const name = useAppSelector(selectSearchName);
  const stargarzer = useAppSelector(selectSearchStargarzer);
  const topics = useAppSelector(selectSearchTopics);
  const [query, setQuery] = useState('');
  const [text, setText] = useState('');
  const [isDev, setIsDev] = useState(false);

  const info =
    'search rules: \n-params order: [\n \t"topic name",\n \t "number of related topics",\n \t "number of stargazers"\n].\n-set params using "," or "enter".';

  const onChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const queryChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
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

  const onSearchWithQuery = () => {
    dispatch(onUpdateQuery(query));
  };

  const updateStatus = () => setIsDev(!isDev);

  useEffect(() => {
    dispatch(reset());
    dispatch(resetCustom());
  }, [isDev]);

  return (
    <>
      <Div isFlex marginBottom='15px'>
        {name ? (
          <Chip
            onClick={() => dispatch(onClearParam('name'))}
            control='Name'
            text={name}
          />
        ) : null}
        {topics ? (
          <Chip
            onClick={() => dispatch(onClearParam('topics'))}
            control='Topics'
            text={topics}
          />
        ) : null}
        {stargarzer ? (
          <Chip
            onClick={() => dispatch(onClearParam('stargarzer'))}
            control='Stargarzer'
            text={stargarzer}
          />
        ) : null}
      </Div>
      <Div isFlex alignItems='flex-start' className='row'>
        {!isDev && (
          <Input
            id='searchQuery'
            label='Search: '
            value={text}
            placeholder='search...'
            onChange={onChange}
            onKeyDown={handleKeyDown}
            info={info}
          />
        )}
        {isDev && (
          <TextArea
            id='searchQuery'
            label='Query: '
            value={query}
            onChange={queryChange}
            info='hope you know what you are doing!'
          />
        )}

        <div className='col-auto' style={{ border: 'none' }}>
          <button
            className={`btn ${isDev ? 'btn-secondary' : 'btn-primary'}`}
            onClick={updateStatus}
          >
            switch mode
          </button>
        </div>

        {isDev && (
          <div className='col-auto' style={{ border: 'none' }}>
            <button
              className='btn btn-primary'
              onClick={() => onSearchWithQuery()}
            >
              subtmit query
            </button>
          </div>
        )}
      </Div>
    </>
  );
};

export default Search;
