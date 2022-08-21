import React from 'react';
import { screen } from '@testing-library/react';
import SelectedTopic from '../components/selectedTopic';
import { renderWithProviders } from '../../../utils/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { initialState } from '../redux/topicsSlice';
import { initialState as initialFilter } from '../../filter/redux/filterSlice';
import { MockedProvider } from '@apollo/client/testing';
import { queries } from '../services/queries';
import wait from 'waait';

const mockSelected = {
  topic: {
    id: 'MDU6VG9waWNhbmd1bGFy',
    name: 'angular',
    stargazerCount: 45011,
    relatedTopics: [
      {
        id: 'MDU6VG9waWNyZWFjdA==',
        name: 'react',
        stargazerCount: 76402,
        __typename: 'Topic',
      },
      {
        id: 'MDU6VG9waWN2dWU=',
        name: 'vue',
        stargazerCount: 50143,
        __typename: 'Topic',
      },
      {
        id: 'MDU6VG9waWNhcGk=',
        name: 'api',
        stargazerCount: 58320,
        __typename: 'Topic',
      },
      {
        id: 'MDU6VG9waWN0eXBlc2NyaXB0',
        name: 'typescript',
        stargazerCount: 29196,
        __typename: 'Topic',
      },
      {
        id: 'MDU6VG9waWNsaW51eA==',
        name: 'linux',
        stargazerCount: 80183,
        __typename: 'Topic',
      },
      {
        id: 'MDU6VG9waWNnb2xhbmc=',
        name: 'golang',
        stargazerCount: 1509,
        __typename: 'Topic',
      },
      {
        id: 'MDU6VG9waWNyZWFjdGpz',
        name: 'reactjs',
        stargazerCount: 1143,
        __typename: 'Topic',
      },
    ],
    stargazers: {
      edges: [
        {
          node: {
            id: 'MDQ6VXNlcjQ1MTE4NDMz',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/45118433?u=05d625da10e80779ab7733cbe58988bc7ce7353a&v=4',
            email: '',
            name: 'Vittal Kumar',
            __typename: 'User',
          },
          __typename: 'StargazerEdge',
        },
        {
          node: {
            id: 'MDQ6VXNlcjQ1MTIxOTYw',
            avatarUrl: 'https://avatars.githubusercontent.com/u/45121960?v=4',
            email: '',
            name: null,
            __typename: 'User',
          },
          __typename: 'StargazerEdge',
        },
        {
          node: {
            id: 'MDQ6VXNlcjQ1MTQ3MjE4',
            avatarUrl: 'https://avatars.githubusercontent.com/u/45147218?v=4',
            email: '',
            name: null,
            __typename: 'User',
          },
          __typename: 'StargazerEdge',
        },
        {
          node: {
            id: 'MDQ6VXNlcjQ1MTU0OTI2',
            avatarUrl: 'https://avatars.githubusercontent.com/u/45154926?v=4',
            email: '',
            name: null,
            __typename: 'User',
          },
          __typename: 'StargazerEdge',
        },
        {
          node: {
            id: 'MDQ6VXNlcjQ1MTU4Nzk0',
            avatarUrl: 'https://avatars.githubusercontent.com/u/45158794?v=4',
            email: '',
            name: null,
            __typename: 'User',
          },
          __typename: 'StargazerEdge',
        },
        {
          node: {
            id: 'MDQ6VXNlcjQ1MTYyMzY3',
            avatarUrl: 'https://avatars.githubusercontent.com/u/45162367?v=4',
            email: '',
            name: 'firststep2florian',
            __typename: 'User',
          },
          __typename: 'StargazerEdge',
        },
        {
          node: {
            id: 'MDQ6VXNlcjQ1MTYyNzYy',
            avatarUrl: 'https://avatars.githubusercontent.com/u/45162762?v=4',
            email: '',
            name: null,
            __typename: 'User',
          },
          __typename: 'StargazerEdge',
        },
        {
          node: {
            id: 'MDQ6VXNlcjQ1MjI5OTY5',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/45229969?u=c73503dae964b48540be35fc95e2d2d92fa3952c&v=4',
            email: '',
            name: 'alittlehotcurry',
            __typename: 'User',
          },
          __typename: 'StargazerEdge',
        },
        {
          node: {
            id: 'MDQ6VXNlcjQ1MjUyNzgx',
            avatarUrl:
              'https://avatars.githubusercontent.com/u/45252781?u=9460d53884db9ba77e84418fa68efec26601b073&v=4',
            email: '',
            name: 'Pranav Salunkhe',
            __typename: 'User',
          },
          __typename: 'StargazerEdge',
        },
        {
          node: {
            id: 'MDQ6VXNlcjQ1MjY4OTky',
            avatarUrl: 'https://avatars.githubusercontent.com/u/45268992?v=4',
            email: '',
            name: null,
            __typename: 'User',
          },
          __typename: 'StargazerEdge',
        },
      ],
      __typename: 'StargazerConnection',
    },
    __typename: 'Topic',
  },
};
const mockVariables = { name: 'angular', stargazers: 10, relateds: 10 };
describe('Render SelectedTopic component', () => {
  test('basic render', () => {
    const mockEvent = jest.fn();
    renderWithProviders(
      <MockedProvider
        mocks={[
          {
            request: {
              query: queries.GET_TOPIC,
              variables: mockVariables,
            },
            result: {
              data: mockSelected,
            },
          },
        ]}
        addTypename={false}
      >
        <BrowserRouter>
          <SelectedTopic onSelect={mockEvent} selected='angular' />
        </BrowserRouter>
      </MockedProvider>
    );

    expect(screen.getByText('Selected Topic')).toBeInTheDocument();
  });

  test('render loading', async () => {
    const mockEvent = jest.fn();
    renderWithProviders(
      <MockedProvider
        mocks={[
          {
            request: {
              query: queries.GET_TOPIC,
              variables: mockVariables,
            },
          },
        ]}
        addTypename={false}
      >
        <BrowserRouter>
          <SelectedTopic onSelect={mockEvent} selected='angular' />
        </BrowserRouter>
      </MockedProvider>,
      {
        preloadedState: {
          topics: {
            ...initialState,
          },
        },
      }
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('render error', async () => {
    const mockEvent = jest.fn();
    const topicMock = {
      request: {
        query: queries.GET_TOPIC,
        variables: mockVariables,
      },
      result: { errors: [{ message: 'sucks' }] },
    };
    renderWithProviders(
      <MockedProvider mocks={[topicMock]} addTypename={false}>
        <BrowserRouter>
          <SelectedTopic onSelect={mockEvent} selected='angular' />
        </BrowserRouter>
      </MockedProvider>,
      {
        preloadedState: {
          topics: {
            ...initialState,
          },
          filter: {
            ...initialFilter,
          },
        },
      }
    );

    await wait(500);

    expect(screen.getByText('Error: sucks')).toBeInTheDocument();
  });

  test('render data', async () => {
    const mockEvent = jest.fn();
    const topicMock = {
      request: {
        query: queries.GET_TOPIC,
        variables: mockVariables,
      },
      result: jest.fn().mockReturnValue({
        data: mockSelected,
      }),
    };
    renderWithProviders(
      <MockedProvider mocks={[topicMock]} addTypename={false}>
        <BrowserRouter>
          <SelectedTopic onSelect={mockEvent} selected='angular' />
        </BrowserRouter>
      </MockedProvider>,
      {
        preloadedState: {
          topics: {
            ...initialState,
          },
          filter: {
            ...initialFilter,
          },
        },
      }
    );

    await wait(500);

    const el = await screen.findByTestId('related-topics-table');
    expect(el).toBeInTheDocument();
  });
});
