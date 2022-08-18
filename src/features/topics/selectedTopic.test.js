import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import SelectedTopic from './selectedTopic';
import { renderWithProviders } from '../../utils/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { initialState } from './topicsSlice';

const mockData = {
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
      stargazerCount: 58170,
    },
    {
      id: 'MDU6VG9waWNnb2xhbmc=',
      name: 'golang',
      stargazerCount: 1509,
    },
    {
      id: 'MDU6VG9waWNoYWNrdG9iZXJmZXN0',
      name: 'hacktoberfest',
      stargazerCount: 15325,
    },
    {
      id: 'MDU6VG9waWNweXRob24=',
      name: 'python',
      stargazerCount: 228549,
    },
    {
      id: 'MDU6VG9waWN0eXBlc2NyaXB0',
      name: 'typescript',
      stargazerCount: 29123,
    },
  ],
  stargazerCount: 44923,
  stargazers: [
    {
      node: {
        id: 'MDQ6VXNlcjQ1MTM3NDAy',
        avatarUrl: 'https://avatars.githubusercontent.com/u/45137402?v=4',
        email: '',
        name: null,
      },
    },
    {
      node: {
        id: 'MDQ6VXNlcjQ1MTYyMzY3',
        avatarUrl: 'https://avatars.githubusercontent.com/u/45162367?v=4',
        email: '',
        name: 'firststep2florian',
      },
    },
    {
      node: {
        id: 'MDQ6VXNlcjQ1MTcyMzE1',
        avatarUrl:
          'https://avatars.githubusercontent.com/u/45172315?u=f3017d4e7d4177b63ae8b2bae5ad498592068879&v=4',
        email: '',
        name: 'Jerry Lehtisyrjä',
      },
    },
    {
      node: {
        id: 'MDQ6VXNlcjQ1MjA3Nzc3',
        avatarUrl: 'https://avatars.githubusercontent.com/u/45207777?v=4',
        email: '',
        name: null,
      },
    },
    {
      node: {
        id: 'MDQ6VXNlcjQ1Mjg5ODQ2',
        avatarUrl: 'https://avatars.githubusercontent.com/u/45289846?v=4',
        email: '',
        name: null,
      },
    },
    {
      node: {
        id: 'MDQ6VXNlcjQ1MzIxMTgx',
        avatarUrl:
          'https://avatars.githubusercontent.com/u/45321181?u=dfa834d518e13fd3560c33deb4493149abddad8d&v=4',
        email: '',
        name: 'Ralf Völker',
      },
    },
    {
      node: {
        id: 'MDQ6VXNlcjQ1MzQwMDY4',
        avatarUrl:
          'https://avatars.githubusercontent.com/u/45340068?u=38af028e011ea5eb810c291802f6509d2757da39&v=4',
        email: '',
        name: 'Kieran',
      },
    },
    {
      node: {
        id: 'MDQ6VXNlcjQ1MzczNjQ5',
        avatarUrl: 'https://avatars.githubusercontent.com/u/45373649?v=4',
        email: '',
        name: null,
      },
    },
    {
      node: {
        id: 'MDQ6VXNlcjQ1NDM2MDQz',
        avatarUrl: 'https://avatars.githubusercontent.com/u/45436043?v=4',
        email: '',
        name: null,
      },
    },
    {
      node: {
        id: 'MDQ6VXNlcjQ1NTAwNzEx',
        avatarUrl:
          'https://avatars.githubusercontent.com/u/45500711?u=ab0a582ccd17a66abb77ac764d2fad591578377e&v=4',
        email: '',
        name: 'Laleh Asadi',
      },
    },
  ].map((item) => item.node),
};

const mockParams = jest.fn(() => 'angular');
jest.mock('react-router-dom', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    // add your noops here
    useParams: () => mockParams,
  };
});

const mockOnSelectTopic = jest.fn(() => 'angular');
jest.mock('./topicsSlice', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('./topicsSlice');

  return {
    __esModule: true,
    ...originalModule,
    // add your noops here
    onSelectTopic: () => mockOnSelectTopic,
  };
});
describe('Render SelectedTopic component', () => {
  test('basic render', () => {
    renderWithProviders(
      <BrowserRouter>
        <SelectedTopic />
      </BrowserRouter>
    );

    expect(screen.getByText('Selected Topic')).toBeInTheDocument();
  });

  test('render Stargazers', async () => {
    renderWithProviders(
      <BrowserRouter>
        <SelectedTopic />
      </BrowserRouter>,
      {
        preloadedState: {
          topics: {
            ...initialState,
            selectedTopic: mockData,
          },
        },
      }
    );

    expect(screen.getByText('firststep2florian')).toBeInTheDocument();
  });

  test('unmount dispatch', async () => {
    const { unmount } = renderWithProviders(
      <BrowserRouter>
        <SelectedTopic />
      </BrowserRouter>,
      {
        preloadedState: {
          topics: {
            ...initialState,
            selectedTopic: mockData,
          },
        },
      }
    );

    unmount();
    await expect(mockOnSelectTopic).toHaveBeenCalled();
  });
});
