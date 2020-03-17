import React from 'react';
import BrowserStorageContext from '../utils/BrowserStorageContext/browserStorageContext';
import checkAuth from './checkAuth';

const withAuthService = Component => props => (
  <BrowserStorageContext.Consumer>
    {() => <Component {...props} checkAuth={checkAuth} />}
  </BrowserStorageContext.Consumer>
);

export default withAuthService;
