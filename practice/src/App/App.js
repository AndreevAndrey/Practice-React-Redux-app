import React from 'react';
import './App.css';
import Routes from '../Routes/Routes';
import BrowserStorageContext from '../utils/BrowserStorageContext/browserStorageContext';

function App() {
  return (
    <BrowserStorageContext.Provider value={localStorage}>
      <div className='App'>
        <Routes />
      </div>
    </BrowserStorageContext.Provider>
  );
}

export default App;
