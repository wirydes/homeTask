import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Topics from './topics';
import { renderWithProviders } from '../../utils/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { initialState } from './topicsSlice';

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

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    // add your noops here
    useNavigate: () => mockNavigate,
  };
});
describe('Render Topics component', () => {
  test('basic render', () => {
    renderWithProviders(
      <BrowserRouter>
        <Topics />
      </BrowserRouter>
    );

    expect(screen.getByText('Topics')).toBeInTheDocument();
  });

  test('render 3 topics', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Topics />
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
    renderWithProviders(
      <BrowserRouter>
        <Topics />
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

    await expect(mockNavigate).toHaveBeenCalledWith(`/topic/angular`, {
      replace: false,
    });
  });
});
