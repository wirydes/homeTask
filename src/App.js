import React from 'react';
import logo from './logo.svg';
import './App.css';

function App({ children }) {
  return (
    <div className='App'>
      <header>
        <img src={logo} className='App-logo' alt='logo' />
      </header>

      {children}
    </div>
  );
}

export default App;
