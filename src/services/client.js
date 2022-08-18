import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    'Content-Type': 'applicaiton/json',
    Authorization: `token ${process.env.REACT_APP_GRAPHQL_TOKEN}`,
  },
});

instance.interceptors.response.use(
  function (response) {
    if (response.data.errors) {
      const error = response.data.errors
        .map((error) => error.message)
        .join(' ');
      return { error };
    }

    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
