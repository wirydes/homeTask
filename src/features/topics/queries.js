const getQueryParams = (
  customQuery = { name: '', stargazers: 0, topics: 0 },
  defaultName
) => {
  const { name, stargazers, topics } = customQuery;
  const search = name ? name : defaultName;
  const relateds = topics ? Number(topics) : 10;
  const customStargarzer = stargazers ? Number(stargazers) : 10;

  return {
    search,
    relateds,
    customStargarzer,
  };
};
export const queries = {
  getTopics: (name, customQuery = { name: '', stargazers: '', topics: '' }) => {
    const { search, relateds, customStargarzer } = getQueryParams(
      customQuery,
      name
    );
    return `{ 
        topic(name: "${search}") {
          id,
          name,
          stargazerCount,
          relatedTopics(first: ${relateds}) {
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
    const { search, relateds, customStargarzer } = getQueryParams(
      customQuery,
      name
    );
    return `{
        topic(name: "${search}") {
          id,
          name,
          stargazerCount,
          relatedTopics(first: ${relateds}) {
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
