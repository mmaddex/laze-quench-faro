import React from 'react';
import { Router, Route, IndexRedirect } from 'react-router';

import * as containers from './containers';

export default (history) =>
  <Router history={history}>
    <Route path="/" component={containers.RequireAuthentication(containers.App)}>
      <IndexRedirect to="dashboard" />
      <Route path="/dashboard" component={containers.Dashboard} />
    </Route>
    <Route path="/login" component={containers.Login} />
  </Router>;
