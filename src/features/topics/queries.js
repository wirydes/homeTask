export const queries = {
  getTopics: (name) => `{ 
        topic(name: "${name}") {
          id,
          name,
          stargazerCount,
          relatedTopics(first: 10) {
            id,
            name,
            stargazerCount
          },
          stargazers(first: 10) {
            nodes {
              id,
              avatarUrl
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
