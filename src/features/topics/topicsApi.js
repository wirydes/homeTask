import { gql } from '@apollo/client';
import client from '../../services/client';
import { queries } from './queries.js';

export function getReactTopics(signal, customQuery = '') {
  const query = queries.getTopics('react', customQuery);
  return client.query({
    query: gql`
      ${query}
    `,
  });
}

export function getReactTopic(signal, name, customQuery = '') {
  const query = queries.getTopic(name, customQuery);
  return client.query({
    query: gql`
      ${query}
    `,
  });
}
