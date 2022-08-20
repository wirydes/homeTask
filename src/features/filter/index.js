import React from 'react';
import { useParams } from 'react-router-dom';
import { onUpdateSearch, selectSearch } from './filterSlice';
import { useAppDispatch, useAppSelector } from '../../utils/constants';
import Input from '../../shared/input';

const Search = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const searchFilter = useAppSelector(selectSearch);
  const getCleaned = (value) => value.replace(`${id},`, '').trim();
  const info =
    'search rules: \n-params order: [\n \t"topic name",\n \t "number of related topics",\n \t "number of stargazers"\n].\n-params are separetad by ","';
  const onChange = (e) => {
    const cleaned = getCleaned(e.target.value);
    const value = id ? `${id}, ${cleaned}` : cleaned;
    dispatch(onUpdateSearch(value));
  };

  const pre = getCleaned(searchFilter);
  return (
    <>
      <form>
        <Input
          id='searchQuery'
          label='Search: '
          value={id ? `${id}, ${pre}` : pre}
          onChange={onChange}
          info={info}
        />
      </form>
    </>
  );
};

export default Search;
