import React, { memo } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Alert, Alerts, Home, NotFound } from '../pages';
import FormProvider from '../context/FormContext';

const Router = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <FormProvider>
      <Switch>
        <Route path="/alert/:doc">
          <Alert />
        </Route>

        <Route path="/alerts">
          <Alerts />
        </Route>

        <Route exact path="/">
          <Home />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </FormProvider>
  </BrowserRouter>
);

export default memo(Router);
