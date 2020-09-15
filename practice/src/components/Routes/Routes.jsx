import React from 'react';
import { Router, Switch } from 'react-router-dom';
import history from '../../utils/history/history';
import PublicRoutes from './PublicRoutes/PublicRoutes';
import PrivateRoutes from './PrivateRoutes/PrivateRoutes';
import PublicPages from '../PublicPages/PublicPages';
import PrivatePages from '../PrivatePages/PrivatePages';
import routePath from './routePath';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <PublicRoutes path={routePath.PUBLIC_PAGE} component={PublicPages} />
      <PrivateRoutes path={routePath.PROFILE} component={PrivatePages} />
    </Switch>
  </Router>
);
export default Routes;
