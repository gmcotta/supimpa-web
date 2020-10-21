import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  RouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from './context/AuthContext';

import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import InstitutionDetails from './pages/InstitutionDetails';
import CreateInstitution from './pages/CreateInstitution';
import ThankYouPage from './pages/ThankYouPage';
import AdminLogin from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';

type CustomRouteProps = RouteProps & {
  isPrivate?: boolean;
  component: React.ComponentType;
};

const CustomRoute: React.FC<CustomRouteProps> = ({
  isPrivate = false,
  ...otherProps
}) => {
  const { user } = useAuth();

  if (isPrivate && !user) {
    return <Redirect to="/admin" />;
  }

  return <Route {...otherProps} />;
};

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <CustomRoute path="/" exact component={HomePage} />
        <CustomRoute path="/map" exact component={MapPage} />
        <CustomRoute
          path="/institutions/:id"
          exact
          component={InstitutionDetails}
        />
        <CustomRoute path="/create" exact component={CreateInstitution} />
        <CustomRoute path="/thank-you" exact component={ThankYouPage} />
        <CustomRoute path="/admin" exact component={AdminLogin} />
        <CustomRoute
          path="/admin/dashboard"
          exact
          isPrivate
          component={Dashboard}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
