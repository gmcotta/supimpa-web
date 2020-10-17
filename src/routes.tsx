import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import InstitutionDetails from './pages/InstitutionDetails';
import CreateInstitution from './pages/CreateInstitution';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/map" exact component={MapPage} />
        <Route path="/institutions/:id" exact component={InstitutionDetails} />
        <Route path="/create" exact component={CreateInstitution} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
