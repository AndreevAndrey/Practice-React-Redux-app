import React from 'react';
import './App.css';
import Provider from 'react-redux/es/components/Provider';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from '../Header/Header';
import store from '../Redux/store';
import ProfileContainer from '../Profile/ProfileContainer';
import TasksContainer from '../Tasks/TasksContainer';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className='App'>
          <Header />
          <div className='page'>
            <Route path='/profile' component={ProfileContainer} />
            <Route path='/tasks' component={TasksContainer} />
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
