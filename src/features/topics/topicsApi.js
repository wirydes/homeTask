import { gql } from '@apollo/client';
import client from '../../services/client';
import { queries } from './queries.js';

export function getReactTopics({
  signal,
  paramsQuery = { name: '', stargazers: 3, topics: 3 },
  customQuery = '',
}) {
  if (customQuery) {
    return client.query({
      query: gql`
        ${customQuery}
      `,
    });
  }

  const query = queries.GET_TOPICS;
  const { name, stargazers, topics } = paramsQuery;
  const variables = {
    name: name ? name : 'react',
    stargazers: stargazers === '' ? 3 : Number(stargazers),
    relateds: topics === '' ? 3 : Number(topics),
  };
  return client.query({
    query: query,
    variables: variables,
  });
}

export function getReactTopic(customQuery = '') {
  if (customQuery) {
    return gql`
      ${customQuery}
    `;
  }

  return queries.GET_TOPIC;
}
