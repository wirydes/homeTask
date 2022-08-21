import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Topics from './topics';
import { renderWithProviders } from '../../utils/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { initialState } from './topicsSlice';
import { MockedProvider } from '@apollo/client/testing';
import { queries } from './queries';
const mockData = [
  {
    id: 'MDU6VG9waWNhbmd1bGFy',
    name: 'angular',
    relatedTopics: [
      {
        id: 'MDU6VG9waWNyZWFjdA==',
        name: 'react',
        stargazerCount: 76232,
      },
      {
        id: 'MDU6VG9waWN2dWU=',
        name: 'vue',
        stargazerCount: 50073,
      },
      {
        id: 'MDU6VG9waWNpb3M=',
        name: 'ios',
        stargazerCount: 30666,
      },
    ],
    stargazerCount: 44923,
  },
  {
    id: 'MDU6VG9waWNyZWFjdC1uYXRpdmU=',
    name: 'react-native',
    relatedTopics: [
      {
        id: 'MDU6VG9waWNyZWFjdGpz',
        name: 'reactjs',
        stargazerCount: 1139,
      },
      {
        id: 'MDU6VG9waWNhcGk=',
        name: 'api',
        stargazerCount: 58169,
      },
      {
        id: 'MDU6VG9waWNnb2xhbmc=',
        name: 'golang',
        stargazerCount: 1509,
      },
    ],
    stargazerCount: 25698,
  },
  {
    id: 'MDU6VG9waWN2dWU=',
    name: 'vue',
    relatedTopics: [
      {
        id: 'MDU6VG9waWNhbmd1bGFy',
        name: 'angular',
        stargazerCount: 44923,
      },
      {
        id: 'MDU6VG9waWNyZWFjdA==',
        name: 'react',
        stargazerCount: 76232,
      },
      {
        id: 'MDU6VG9waWN0eXBlc2NyaXB0',
        name: 'typescript',
        stargazerCount: 29122,
      },
    ],
    stargazerCount: 50073,
  },
];

const mockSelected = {
  topic: {
    id: 'MDU6VG9waWNhbmd1bGFy',
    name: 'angular',
    stargazerCount: 45011,
    relatedTopics: [
      {
        id: 'MDU6VG9waWNyZWFjdA==',
        name: 'react',
        stargazerCount: 76397,
        __typename: 'Topic',
      },
      {
        id: 'MDU6VG9waWN2dWU=',
        name: 'vue',
        stargazerCount: 50142,
        __typename: 'Topic',
      },
      {
        id: 'MDU6VG9waWNhcGk=',
        name: 'api',
        stargazerCount: 58316,
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
        stargazerCount: 80182,
        __typename: 'Topic',
      },
      {
        id: 'MDU6VG9waWNnb2xhbmc=',
        name: 'golang',
        stargazerCount: 1510,
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
const mockQuery = jest.fn().mockReturnValue({
  loading: false,
  error: false,
  data: mockSelected,
});

describe('Render Topics component', () => {
  test('basic render', () => {
    const mockEvent = jest.fn();
    renderWithProviders(
      <BrowserRouter>
        <Topics selected='' onChangeSelected={mockEvent} />
      </BrowserRouter>
    );

    expect(screen.getByText('Topics')).toBeInTheDocument();
  });

  test('render 3 topics', async () => {
    const mockEvent = jest.fn();
    renderWithProviders(
      <BrowserRouter>
        <Topics selected='' onChangeSelected={mockEvent} />
      </BrowserRouter>,
      {
        preloadedState: {
          topics: {
            ...initialState,
            relatedTopics: mockData,
          },
        },
      }
    );

    expect(await screen.findByText('angular')).toBeInTheDocument();
    expect(await screen.findByText('react-native')).toBeInTheDocument();
    expect(await screen.findByText('vue')).toBeInTheDocument();
  });

  test('click on one row', async () => {
    const mockEvent = jest.fn();
    const { rerender } = renderWithProviders(
      <BrowserRouter>
        <Topics selected='' onChangeSelected={mockEvent} />
      </BrowserRouter>,
      {
        preloadedState: {
          topics: {
            ...initialState,
            relatedTopics: mockData,
          },
        },
      }
    );

    const rowElement = await screen.findByText('angular');
    fireEvent.click(rowElement);
    rerender(
      <MockedProvider
        mocks={[
          {
            request: {
              query: queries.getTopics(),
              variables: {
                name: 'angular',
                stargazers: 3,
                relateds: 3,
              },
            },
            result: {
              data: mockSelected,
            },
          },
        ]}
        addTypename={false}
      >
        <BrowserRouter>
          <Topics selected='angular' onCfhangeSelected={mockEvent} />
        </BrowserRouter>
      </MockedProvider>
    );
    const divEl = await screen.findByTestId('selected-topic');
    expect(mockEvent).toHaveBeenCalled();
    expect(divEl).toBeInTheDocument();
  });
});
