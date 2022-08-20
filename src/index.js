import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { setUpStore } from './app/store';
import { ApolloProvider } from '@apollo/client/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactTopic from './features/topics/index';
import SelectedTopic from './features/topics/selectedTopic';
import Search from './features/filter';
import client from './services/client';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={setUpStore()}>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={
                <App>
                  <Search />
                  <ReactTopic />
                </App>
              }
            />

            <Route
              path='/topic/:id'
              element={
                <App>
                  <Search />
                  <SelectedTopic />
                </App>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
