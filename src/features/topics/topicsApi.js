import { gql } from '@apollo/client';
import client from '../../services/client';
import { queries } from './queries.js';

export function getReactTopics({
  signal,
  paramsQuery = { name: '', stargazers: 3, topics: 3 },
  customQuery = '',
}) {
  const query = customQuery
    ? `{${customQuery}}`
    : queries.getTopics('react', paramsQuery, customQuery);
  return client.query({
    query: gql`
      ${query}
    `,
  });
}

export function getReactTopic(
  name,
  paramsQuery = { name: '', stargazers: 3, topics: 3 },
  customQuery = ''
) {
  const query = customQuery ? customQuery : queries.getTopic(name, paramsQuery);
  return gql`
    ${query}
  `;
}
