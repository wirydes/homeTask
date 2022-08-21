import { gql } from '@apollo/client';
export const queries = {
  getTopics: () => {
    return gql`
      query GetTopicLanding($name: String!, $relateds: Int, $stargazers: Int) {
        topic(name: $name) {
          id
          name
          stargazerCount
          relatedTopics(first: $relateds) {
            id
            name
            stargazerCount
            stargazers(first: $stargazers) {
              nodes {
                id
                avatarUrl
              }
            }
          }
        }
      }
    `;
  },
  getTopic: () => {
    return gql`
      query GetTopicSelected($name: String!, $relateds: Int, $stargazers: Int) {
        topic(name: $name) {
          id
          name
          stargazerCount
          relatedTopics(first: $relateds) {
            id
            name
            stargazerCount
          }
          stargazers(first: $stargazers) {
            edges {
              node {
                id
                avatarUrl
                email
                name
              }
            }
          }
        }
      }
    `;
  },
};
