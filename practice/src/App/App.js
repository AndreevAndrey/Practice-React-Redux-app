import React from 'react';
import './App.css';
import Provider from 'react-redux/es/components/Provider';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from '../Header/Header';
import store from '../redux/store';
import ProfileContainer from '../Profile/ProfileContainer';
import TasksContainer from '../Tasks/TasksContainer';
import LoginContainer from '../Auth/Login/LoginContainer';
import SignInContainer from '../Auth/SignIn/SignInContainer';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='App'>
          <Header />
          <div className='page'>
            <Route path='/profile' component={ProfileContainer} />
            <Route path='/tasks' component={TasksContainer} />
            <Route path='/login' component={LoginContainer} />
            <Route path='/signin' component={SignInContainer} />
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
