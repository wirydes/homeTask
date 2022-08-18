export const queries = {
  getTopics: (
    name,
    relatedTopics = 3,
    topicRelated = 3,
    repositories = 3
  ) => `{ 
        topic(name: "${name}") {
          id,
          name,
          stargazerCount,
          relatedTopics(first: ${relatedTopics}) {
            id,
            name,
            relatedTopics(first: ${topicRelated}) {
              id,
              name,
              stargazerCount
            },
            stargazerCount
          },
          stargazers(first: 10) {
            edges {
              node {
                id,
                avatarUrl
              }
            }
          },
          repositories(first: ${repositories} orderBy:{ field: CREATED_AT, direction: DESC }) {
              edges {
                node {
                  id,
                  name
                }
              }
            }
          }
      }`,
  getTopic: (name, relatedTopics = 10) => `{
        topic(name: "${name}") {
          id,
          name,
          stargazerCount,
          relatedTopics(first: ${relatedTopics}) {
            id,
            name,
            stargazerCount
          },
          stargazers(first: 10) {
            edges {
              node {
                id,
                avatarUrl,
                email,
                name
              }
            }
          },
        }
      }`,
};
