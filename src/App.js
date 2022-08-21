import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './features/filter/components/index';

function App({ children }) {
  return (
    <div className='App'>
      <header>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
      <Search />
      {children}
    </div>
  );
}

export default App;
