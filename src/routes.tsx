import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/map" exact component={MapPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
