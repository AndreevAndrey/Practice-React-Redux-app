import React from 'react';
import BrowserStorageContext from '../utils/BrowserStorageContext/browserStorageContext';

const withAuthService = Component => props => (
  <BrowserStorageContext.Consumer>
    {({ token }) => <Component {...props} token={token} />}
  </BrowserStorageContext.Consumer>
);

export default withAuthService;
