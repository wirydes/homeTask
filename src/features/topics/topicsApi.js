import { gql } from '@apollo/client';
import client from '../../services/client';
import { queries } from './queries.js';

export function getReactTopics(signal) {
  const query = queries.getTopics('react');
  return client.query({
    query: gql`
      ${query}
    `,
  });
}

export function getReactTopic(signal, name, relatedTopics = 10) {
  const query = queries.getTopic(name, relatedTopics);
  return client.query({
    query: gql`
      ${query}
    `,
  });
}
