import { gql } from '@apollo/client';
import client from '../../services/client';
import { queries } from './queries.js';

export function getReactTopics(
  signal,
  customQuery = { name: '', stargazers: 3, topics: 3 }
) {
  const query = queries.getTopics('react', customQuery);
  return client.query({
    query: gql`
      ${query}
    `,
  });
}

export function getReactTopic(
  name,
  customQuery = { name: '', stargazers: 3, topics: 3 }
) {
  const query = queries.getTopic(name, customQuery);
  return gql`
    ${query}
  `;
}
