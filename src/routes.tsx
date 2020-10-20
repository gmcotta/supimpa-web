import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import InstitutionDetails from './pages/InstitutionDetails';
import CreateInstitution from './pages/CreateInstitution';
import ThankYouPage from './pages/ThankYouPage';
import AdminLogin from './pages/Admin/Login';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/map" exact component={MapPage} />
        <Route path="/institutions/:id" exact component={InstitutionDetails} />
        <Route path="/create" exact component={CreateInstitution} />
        <Route path="/thank-you" exact component={ThankYouPage} />
        <Route path="/admin" exact component={AdminLogin} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
