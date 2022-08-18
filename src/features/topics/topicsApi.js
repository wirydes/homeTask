import client from '../../services/client';
import { queries } from './queries.js';

export function getReactTopics(
  signal,
  relatedTopics = 3,
  topicRelated = 3,
  repositories = 3
) {
  const query = queries.getTopics(
    'react',
    relatedTopics,
    topicRelated,
    repositories
  );
  return client.post(process.env.REACT_APP_BASE_URL, {
    signal,
    query,
  });
}

export function getReactTopic(signal, name, relatedTopics = 10) {
  const query = queries.getTopic(name, relatedTopics);
  return client.post(process.env.REACT_APP_BASE_URL, {
    signal,
    query,
  });
}
