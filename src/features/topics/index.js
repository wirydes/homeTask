import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/constants';
import {
  getTopics,
  selectTopicStatus,
  selectErrorMessage,
  selectStagazerCount,
  selectCustomTopic,
} from './topicsSlice';
import {
  selectSearchName,
  selectSearchStargarzer,
  selectSearchTopics,
  selectQuery,
} from '../filter/filterSlice';
import Topics from './topics';
import { apiCallStatus } from '../../utils/constants';

const CustomRender = (custom) => {
  let fixed = {};
  const [inner, setInner] = useState([]);

  const getInnerValues = (current) => {
    return Object.keys(current).reduce((pre, el, i) => {
      let temp = { ...pre };

      if (typeof current[el] === 'undefined' || current[el] === null) {
        return temp;
      }

      if (Array.isArray(current[el])) {
        temp[el] = current[el];
        return temp;
      }

      if (typeof current[el] === 'object') {
        temp = { ...temp, ...getInnerValues(current[el]) };

        return temp;
      }

      temp[el] = current[el];

      return temp;
    }, {});
  };
  fixed = getInnerValues(custom);
  return (
    <>
      <h1>custom search</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginLeft: '25%',
          marginRight: '25%',
        }}
      >
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              {Object.keys(fixed).map((key) => (
                <th tabIndex={0} key={key}>
                  {Array.isArray(fixed[key]) ? `Array of ${key}` : key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.values(fixed).map((value, i) => {
                const isArray = Array.isArray(value);
                const isObject = typeof value === 'object';
                const justText = ![isArray, isObject].some((val) => val);
                return (
                  <td
                    onClick={() => {
                      if (isArray) {
                        setInner(value);
                      }
                    }}
                    tabIndex={0}
                    key={i}
                  >
                    {isArray && value.length}
                    {!isArray && isObject && Object.keys(value).length}
                    {justText && value}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
      {inner.length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginLeft: '25%',
            marginRight: '25%',
          }}
        >
          <table className='table table-striped table-hover'>
            <thead>
              <tr>
                {Object.keys(inner[0]).map((key) => (
                  <th tabIndex={0} key={key}>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inner.map((row, i) => (
                <tr key={`row-${i}`}>
                  {Object.values(row).map((value, j) => {
                    const isArray = Array.isArray(value);
                    const isObject = typeof value === 'object';
                    return value !== null || value || undefined ? (
                      <td tabIndex={0} key={`row-${i}-td-${j}`}>
                        {isArray ? (
                          value.length
                        ) : !isArray && isObject ? (
                          Object.keys(value).length
                        ) : typeof value === 'string' ? (
                          value.indexOf('https://avatars.githubusercontent') >=
                          0 ? (
                            <img
                              width={50}
                              height={50}
                              src={value}
                              alt='avatar'
                            />
                          ) : (
                            value
                          )
                        ) : (
                          value
                        )}
                      </td>
                    ) : (
                      <td tabIndex={0} key={`row-${i}-td-${j}`}>
                        empty
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

const ReactTopic = () => {
  const dispatch = useAppDispatch();

  const [selected, setSelected] = useState('');
  // **topics selects
  const stargazerCount = useAppSelector(selectStagazerCount);
  const status = useAppSelector(selectTopicStatus);
  const error = useAppSelector(selectErrorMessage);
  const customTopic = useAppSelector(selectCustomTopic);

  // **filter selects
  const searchName = useAppSelector(selectSearchName);
  const searchStargarzers = useAppSelector(selectSearchStargarzer);
  const searchTopics = useAppSelector(selectSearchTopics);
  const customQuery = useAppSelector(selectQuery);

  const updateTopics = useCallback(
    (signal) => {
      if (status !== apiCallStatus.loading) {
        dispatch(
          getTopics({
            signal: signal,
            paramsQuery: {
              name: searchName,
              stargarzers: searchStargarzers,
              topics: searchTopics,
            },
            customQuery,
          })
        );
      }
    },
    [searchName, searchStargarzers, searchTopics, customQuery]
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
      {!isLoading && customTopic === null && (
        <>
          <h1 className='h1'>{title} topics</h1>

          <div aria-label='Stargazer Count' style={{ textAlign: 'center' }}>
            Stargazer Count: {stargazerCount}
          </div>
          <Topics selected={selected} onChangeSelected={setSelected} />
        </>
      )}
      {!isLoading && customTopic !== null && (
        <CustomRender custom={{ ...customTopic }} />
      )}
      {!!error && <div aria-live='polite'>{error}</div>}
    </>
  );
};

export default ReactTopic;
