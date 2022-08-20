const getQueryParams = (customQuery = '', name) => {
  const [customName, relateds, stargarzers, ...rest] = customQuery.split(',');
  const search = customName ? customName : name;
  const topics = relateds ? relateds : 10;
  const customStargarzer = stargarzers ? stargarzers : 10;

  return {
    search,
    topics,
    customStargarzer,
  };
};
export const queries = {
  getTopics: (name, customQuery = '') => {
    const { search, topics, customStargarzer } = getQueryParams(
      customQuery,
      name
    );
    return `{ 
        topic(name: "${search}") {
          id,
          name,
          stargazerCount,
          relatedTopics(first: ${topics}) {
            id,
            name,
            stargazerCount,
            stargazers(first: ${customStargarzer}) {
              nodes {
                id,
                avatarUrl
              }
            }
          },
        }
      }`;
  },
  getTopic: (name, customQuery) => {
    const { search, topics, customStargarzer } = getQueryParams(
      customQuery,
      name
    );
    return `{
        topic(name: "${search}") {
          id,
          name,
          stargazerCount,
          relatedTopics(first: ${topics}) {
            id,
            name,
            stargazerCount
          },
          stargazers(first: ${customStargarzer}) {
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
      }`;
  },
};
