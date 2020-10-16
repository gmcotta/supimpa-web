import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import InstitutionDetails from './pages/InstitutionDetails';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/map" exact component={MapPage} />
        <Route path="/institutions/:id" exact component={InstitutionDetails} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
